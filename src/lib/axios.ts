// src/http/axiosClient.ts
import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL as string,
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Erro desconhecido na requisição";

    return Promise.reject(new Error(message));
  }
);

export default axiosClient;
