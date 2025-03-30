import React, { createContext, useState, useEffect } from "react";
import LoginService from "../api/LoginService";
import api from "../api/ApiService";
import StakingService from "../api/StakingService";
import { MetamaskService } from "../api/MetamaskService";
import { PhantomService } from "../api/PhantomService";
import { TonkeeperService } from "../api/TonkeeperService";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [inStaking, setInStaking] = useState(false);
    const [stakingAmount, setStakingAmount] = useState(0);
    const [totalMZK, setTotalMZK] = useState(0);
    const [totalPIC, setTotalPIC] = useState(0);
    const [mzkBalance, setMzkBalance] = useState(0);

    const updateInitValues = async () => {
        const total_values = await StakingService.getTotalValues()
        if (total_values.data) {
            const { total_pic, total_mzk } = total_values.data
            setTotalMZK(Number(total_mzk))
            setTotalPIC(Number(total_pic))
        }
        
        const walletAddress = localStorage.getItem("walletAddress")
        const walletType = localStorage.getItem('walletType')
        
        let balance = 0
        if ( walletType === 'metamask' ) {
            balance = await MetamaskService.getTokenBalance(walletAddress)
            console.log("BALANCE MZK:", balance, "WALLET", walletType)
            
        } else if ( walletType === 'phantom' ) {
            // balance = await PhantomService.getSolBalance(walletAddress)
            // console.log("BALANCE SOL:", balance, "WALLET", walletType)

        } else if ( walletType === 'tron' ) {

        } else if ( walletType === 'tonkeeper' ) {

        }
        if (balance !== null && balance !== undefined) {
            setMzkBalance(Number(balance))
        } else {
            setMzkBalance(0)
        }
        
        const currentStaking = await StakingService.hasActiveStaking()
        if (currentStaking && currentStaking.data.answer === true) {
            setInStaking(true)
            setStakingAmount(Number(currentStaking.data.amount))
        }
    }


    const setTokens = (accessToken, refreshToken) => {
        if (accessToken) {
            localStorage.setItem("access", accessToken);
            api.defaults.headers.Authorization = `Bearer ${accessToken}`;
            setIsAuth(true);
            updateInitValues()
        } else {
            logout();
        }

        if (refreshToken) {
            localStorage.setItem("refresh", refreshToken);
        }
    };
    const setWallet = (walletAddress, walletType) => {
        localStorage.setItem("walletAddress", walletAddress)
        localStorage.setItem("walletType", walletType)
    }

    const logout = () => {
        const walletType = localStorage.getItem('walletType')
        if (walletType === 'tonkeeper') {
            TonkeeperService.disconnect()
        }
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("walletAddress");
        localStorage.removeItem("walletType");
        api.defaults.headers.Authorization = null;
        setIsAuth(false);
        setInStaking(false);
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
            updateInitValues()
        }

        const intervalId = setInterval(refreshAccessToken, 600000);

        const stakingStatus = localStorage.getItem('inStaking')
        if (stakingStatus) {
            setInStaking(true)
        }

        return () => clearInterval(intervalId);
    }, []);
    return <UserContext.Provider value={{ 
        isAuth, 
        setTokens, 
        logout, 
        setWallet, 
        inStaking, 
        setInStaking, 
        totalMZK, 
        totalPIC,
        mzkBalance,
        stakingAmount,
        setStakingAmount,
        updateInitValues
    }}>{children}</UserContext.Provider>;
};

export default UserProvider;
