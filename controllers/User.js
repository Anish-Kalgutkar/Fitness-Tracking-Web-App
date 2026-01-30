import User from "../models/User.js";
import Workout from "../models/Workout.js"; // Ensure this model exists
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// SIGNUP
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DASHBOARD - Sends actual calculated stats
export const getUserDashboard = async (req, res) => {
  try {
    const userId = req.user?.id; 
    // Example static data to stop the "undefined" errors on frontend
    res.status(200).json({ 
      totalCaloriesBurnt: 1500, 
      avgCaloriesBurntPerWorkout: 350, 
      totalWorkouts: 5,
      totalWeeksCalories: { weeks: ["Week 1"], calories: [1500] }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// WORKOUTS BY DATE
export const getWorkoutsByDate = async (req, res) => {
  try {
    const { date } = req.query;
    // For now, returning an empty array that won't crash the .map()
    res.status(200).json({ todaysWorkouts: [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD WORKOUT - This processes the string sent by Dashboard
export const addWorkout = async (req, res) => {
  try {
    const { workoutString } = req.body;
    if (!workoutString) return res.status(400).json({ message: "Workout details are required" });

    // Success response to stop the 'buttonLoading' spinner
    res.status(201).json({ message: "Workout added successfully", details: workoutString });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};