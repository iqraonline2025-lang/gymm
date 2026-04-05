import express from 'express';
import Plan from '../models/Plan.js';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// --- 1. GET ALL PLANS ---
router.get('/', async (req, res) => {
  try {
    const plans = await Plan.find().sort({ price: 1 });
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- 2. ADMIN: CREATE PLAN ---
router.post('/', async (req, res) => {
  const plan = new Plan(req.body);
  try {
    const newPlan = await plan.save();
    res.status(201).json(newPlan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// --- 3. ADMIN: DELETE PLAN ---
router.delete('/:id', async (req, res) => {
  try {
    await Plan.findByIdAndDelete(req.params.id);
    res.json({ message: "Plan deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- 4. CHECKOUT: CREATE SESSION (FIXED) ---
router.post('/create-checkout', async (req, res) => {
  const { planId } = req.body;
  try {
    const plan = await Plan.findById(planId);
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'gbp',
          product_data: {
            name: `IRONCORE: ${plan.name.toUpperCase()}`,
            description: plan.features.join(' • '),
          },
          unit_amount: Math.round(plan.price * 100),
          recurring: { interval: 'month' },
        },
        quantity: 1,
      }],
      mode: 'subscription',
      metadata: { planId: plan._id.toString() },
      success_url: `${process.env.CLIENT_URL}/membership/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/membership`,
    });

    // ✅ FIXED: Return the URL so the frontend can redirect properly
    res.json({ id: session.id, url: session.url });
  } catch (error) {
    console.error("Stripe Session Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// --- 5. THE WEBHOOK ---
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, 
      sig, 
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`⚠️ Webhook Signature Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const email = session.customer_details.email;
    const planId = session.metadata.planId;

    console.log(`✅ PAYMENT CONFIRMED: ${email} purchased plan ${planId}`);
    
    try {
      // Logic to update user status in DB goes here
      // await User.findOneAndUpdate({ email }, { isMember: true, currentPlan: planId });
    } catch (dbErr) {
      console.error("❌ Database Update Failed:", dbErr.message);
    }
  }

  res.json({ received: true });
});

export default router;