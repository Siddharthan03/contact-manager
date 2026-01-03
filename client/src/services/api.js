import axios from "axios";

const api = axios.create({
  baseURL: "https://contact-manager-ss65.onrender.com",
});

export default api;
