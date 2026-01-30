import express from "express";
import { signup, login, getUserDashboard, getWorkoutsByDate, addWorkout } from "../controllers/User.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/dashboard", getUserDashboard);
router.get("/workouts", getWorkoutsByDate);
router.post("/workout", addWorkout);

export default router;