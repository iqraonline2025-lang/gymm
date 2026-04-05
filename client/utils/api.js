/**
 * API Utility for PowerHouse Gym
 * This handles all communication with the Node.js/Express backend.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// --- PROGRAM SERVICES ---

/**
 * Fetch all programs for the Services Page
 */
export const getAllPrograms = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/programs`);
    if (!response.ok) throw new Error("Failed to fetch programs");
    return await response.json();
  } catch (error) {
    console.error("API Error (getAllPrograms):", error);
    return [];
  }
};

/**
 * Fetch a single program by its slug
 */
export const getProgramBySlug = async (slug) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/programs/${slug}`);
    if (!response.ok) throw new Error("Program not found");
    return await response.json();
  } catch (error) {
    console.error("API Error (getProgramBySlug):", error);
    return null;
  }
};

/**
 * Create a new program (Admin Function)
 */
export const createProgram = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/programs`, {
      method: "POST",
      body: formData, 
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to create program");
    return data;
  } catch (error) {
    console.error("API Error (createProgram):", error);
    throw error; 
  }
};

// --- MEMBERSHIP & STRIPE SERVICES ---

/**
 * ✅ NEW: Fetch all membership plans for the Pricing Grid
 */
export const getAllPlans = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/plans`);
    if (!response.ok) throw new Error("Failed to fetch plans");
    return await response.json();
  } catch (error) {
    console.error("API Error (getAllPlans):", error);
    return [];
  }
};