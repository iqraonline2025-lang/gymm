import Program from '../models/Program.js';

// @desc    Get all programs
export const getPrograms = async (req, res) => {
  try {
    const programs = await Program.find().sort({ createdAt: -1 });
    res.status(200).json(programs);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get single program by slug
export const getProgramBySlug = async (req, res) => {
  try {
    const program = await Program.findOne({ slug: req.params.slug });
    if (!program) return res.status(404).json({ message: "Program not found" });
    res.status(200).json(program);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Create a new program (Admin + File Upload)
export const createProgram = async (req, res) => {
  try {
    // Check if a file was actually uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Please upload an image" });
    }

    // 1. Get the image path (Relative path for the database)
    const imagePath = `/uploads/${req.file.filename}`;

    // 2. Parse the benefits (FormData sends everything as a string)
    let parsedBenefits = [];
    if (req.body.benefits) {
      try {
        parsedBenefits = JSON.parse(req.body.benefits);
      } catch (e) {
        // Fallback if it's already an array or a simple string
        parsedBenefits = req.body.benefits;
      }
    }

    // 3. Create the new program object
    const newProgram = new Program({
      title: req.body.title,
      slug: req.body.slug,
      description: req.body.description,
      target: req.body.target,
      image: imagePath, // Storing the local server path
      benefits: parsedBenefits
    });

    const savedProgram = await newProgram.save();
    res.status(201).json(savedProgram);
  } catch (error) {
    res.status(400).json({ message: "Failed to create program", error: error.message });
  }
};