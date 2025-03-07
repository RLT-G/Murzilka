import api from "./ApiService";
import { apiURL } from "../constans";

export default class LoginService {
    static async googleGetURL() {
        try {
            const response = await api.get("/google/get_url/");
            return response.data.login_url;
        } catch (error) {
            console.error("Ошибка получения Google URL:", error);
            return null;
        }
    }

    static async googleLogin(code) {
        try {
            const response = await api.post("/google/login/", { code });
            return response.data;
        } catch (error) {
            console.error("Ошибка входа через Google:", error);
            return null;
        }
    }

    static async refreshTokens(refresh) {
        try {
            const response = await api.post("/token_refresh/", { refresh });
            return response.data.access;
        } catch (error) {
            console.error("Ошибка обновления токена:", error);
            return null;
        }
    }

    // static async telegramLogin() {
    //     const tg = window.Telegram?.WebApp;

    //     if (!tg || !tg.initDataUnsafe.user) {
    //         return;
    //     }

    //     const userData = {
    //         user_id: tg.initDataUnsafe.user.id,
    //         first_name: tg.initDataUnsafe.user.first_name,
    //         last_name: tg.initDataUnsafe.user.last_name,
    //         username: tg.initDataUnsafe.user.username,
    //         auth_data: tg.initData, 
    //     };

    //     try {
    //         const response = await api.post("/telegram/login/", userData);
    //         // const { access, refresh } = response.data;
    //         // localStorage.setItem("access_token", access);
    //         // localStorage.setItem("refresh_token", refresh);
    //         return response.data;
    //     } catch (error) {
    //         console.error("Ошибка авторизации через Telegram:", error);
    //         return null;
    //     }
    // }

}
