import axios from "axios";

const API = axios.create({
  // Use 127.0.0.1 for better stability on Windows
  baseURL: "http://127.0.0.1:8080/api", 
});

// Auth
export const UserSignUp = async (data) => API.post("/user/signup", data);
export const UserSignIn = async (data) => API.post("/user/login", data); 

// Dashboard
export const getDashboardDetails = async (token) =>
  API.get("/user/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });

// Workouts
export const getWorkouts = async (token, date) =>
  API.get(`/user/workouts${date}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addWorkout = async (token, data) =>
  API.post(`/user/workout`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export default API;