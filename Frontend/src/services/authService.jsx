import axios from "axios";
import { API_URL } from "../../config";

// You can define a base instance of axios (optional but recommended)
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Login function
const login = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);

    const data = response.data;

    // Save token in localStorage
    localStorage.setItem("token", data.access_token);

    return data; // includes token and user info
  } catch (error) {
    const message =
      error.response?.data?.message || "Login failed. Please try again.";
    throw new Error(message);
  }
};

// ✅ Register function
const register = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Registration failed. Please try again.";
    throw new Error(message);
  }
};

// ✅ Token getter
const getToken = () => {
  return localStorage.getItem("token");
};

export const authService = {
  login,
  register,
  getToken,
};

export default authService;
