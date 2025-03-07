import React, { createContext, useState, useEffect } from "react";
import LoginService from "../api/LoginService";
import api from "../api/ApiService";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [inStaking, setInStaking] = useState(false)

    const setTokens = (accessToken, refreshToken) => {
        if (accessToken) {
            localStorage.setItem("access", accessToken);
            api.defaults.headers.Authorization = `Bearer ${accessToken}`;
            setIsAuth(true);
        } else {
            logout();
        }

        if (refreshToken) {
            localStorage.setItem("refresh", refreshToken);
        }
    };
    const setWallet = (walletAddress) => {
        localStorage.setItem("walletAddress", walletAddress)
    }

    const logout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("walletAddress")
        api.defaults.headers.Authorization = null;
        setIsAuth(false);
    };

    const refreshAccessToken = async () => {
        const refreshToken = localStorage.getItem("refresh");
        if (refreshToken && !refreshing) {
            setRefreshing(true);
            const newAccessToken = await LoginService.refreshTokens(refreshToken);
            if (newAccessToken) {
                setTokens(newAccessToken, refreshToken);
            }
            setRefreshing(false);
        }
    };
    useEffect(() => {
        const accessToken = localStorage.getItem("access");
        if (accessToken) {
            api.defaults.headers.Authorization = `Bearer ${accessToken}`;
            setIsAuth(true);
        }

        const intervalId = setInterval(refreshAccessToken, 600000);

        const stakingStatus = localStorage.getItem('inStaking')
        if (stakingStatus) {
            setInStaking(true)
        }

        return () => clearInterval(intervalId);
    }, []);

    return <UserContext.Provider value={{ isAuth, setTokens, logout, setWallet, inStaking, setInStaking }}>{children}</UserContext.Provider>;
};

export default UserProvider;
