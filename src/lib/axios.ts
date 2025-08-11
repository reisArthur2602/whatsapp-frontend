// src/http/axiosClient.ts
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000",
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
