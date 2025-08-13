// src/http/axiosClient.ts
import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // se a API retornar um array de erros, pega ele; senão, cria padrão
    const errorData = error.response?.data?.error ?? [
      { message: error.response?.data?.message ?? "Erro desconhecido" },
    ];

    // rejeita com o objeto completo
    return Promise.reject(errorData);
  }
);

export default axiosClient;
