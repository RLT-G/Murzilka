import axios from "axios";
import { apiURL } from "../constans";
import { useContext } from "react";
import { UserContext } from "../context";
import { useNavigate } from "react-router-dom";

class ApiService {
    constructor() {
        this.api = axios.create({
            baseURL: apiURL,
        });

        this.api.interceptors.request.use(
            async (config) => {
                let accessToken = localStorage.getItem("access");
                if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        this.api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    const refreshToken = localStorage.getItem("refresh");

                    if (!refreshToken) {
                        return Promise.reject(error);
                    }

                    try {
                        const response = await axios.post(`${apiURL}/token_refresh/`, { refresh: refreshToken });
                        const newAccessToken = response.data.access;
                        localStorage.setItem("access", newAccessToken);
                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                        return this.api(originalRequest);
                    } catch (refreshError) {
                        console.error("Ошибка обновления токена:", refreshError);
                        localStorage.removeItem("access");
                        localStorage.removeItem("refresh");
                        window.location.href = "/";
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );
    }

    getInstance() {
        return this.api;
    }
}

export default new ApiService().getInstance();
