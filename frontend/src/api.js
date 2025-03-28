import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const register = (userData) => API.post("/register", userData);
export const login = (credentials) => API.post("/login", credentials);
