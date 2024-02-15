import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
});

// Add a response interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("Axios error:", error.message);

    // Pass the error along
    return Promise.reject(error);
  }
);

export default instance;
