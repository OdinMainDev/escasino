import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_DOMAIN,
});

axiosApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = Cookies.get('atoken');
    const casinoToken = import.meta.env.VITE_APP_CASINO_TOKEN;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (casinoToken && config.headers) {
      config.headers['C-Token'] = casinoToken;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export default axiosApi;
