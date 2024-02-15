import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    console.log("Axios request interceptor:", config);
    return config;
  },
  (error) => {
    console.log("Axios request error:", error.message);
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    console.log("Axios response interceptor:", response);
    return response;
  },
  (error) => {
    if (axios.isCancel(error)) {
      console.log("Request canceled:", error.message);
    } else if (error.response) {
      console.log("Axios response error:", error.response.status);
      console.log("Response data:", error.response.data);
      console.log("Response headers:", error.response.headers);
      console.log("Axios response error:", error);
    } else if (error.request) {

      console.log("No response received. Request details:", error.request);
    } else {
      console.log("Axios error during setup:", error.message);
    }

    return Promise.reject(error);
  }
);

export default instance;
