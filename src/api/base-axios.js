import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5130/api", // Replace with your actual base URL
  timeout: 10000, // Optional: specify a timeout for requests (in milliseconds)
  headers: {
    "Content-Type": "application/json", // Optional: set default headers
  },
});

export default axiosInstance;
