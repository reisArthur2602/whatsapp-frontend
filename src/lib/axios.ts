import axios from "axios";

const url = import.meta.env.VITE_API_URL as string;

const axiosClient = axios.create({
  baseURL: `${url}/session`,
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorData = error.response?.data?.error ?? [
      { message: error.response?.data?.message ?? "Erro desconhecido" },
    ];

    return Promise.reject(errorData);
  }
);

export default axiosClient;
