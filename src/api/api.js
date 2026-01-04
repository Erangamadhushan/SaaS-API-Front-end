import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // httpOnly cookies
});

api.interceptors.request.use((config) => {
  const csrfToken = localStorage.getItem("csrfToken");

  if (csrfToken) {
    config.headers["X-CSRF-Token"] = csrfToken;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const res = await axios.post(
        "http://localhost:5000/api/auth/refresh-token"
      );

      console.log("New token received:", res.data.data.accessToken);

      localStorage.setItem("accessToken", res.data.data.accessToken);
      

      // Defensively handle missing config or headers on the error object
      if (!error.config) {
        return Promise.reject(error);
      }

      error.config.headers = error.config.headers || {};
      error.config.headers[
        "Authorization"
      ] = `Bearer ${res.data.data.accessToken}`;

      return api.request(error.config);
    }

    return Promise.reject(error);
  }
);

export default api;
