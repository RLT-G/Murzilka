import api from "./ApiService";
import Web3 from "web3";
import axios from "axios";
import { STAKING_ABI, STAKING_CONTRACT_ADDRESS, TOKEN_ABI, TOKEN_CONTRACT_ADDRESS } from "../constans";
import StakingService from "./StakingService";


export class TronService {
    static async loginViaTron() {
        if (!window.tronWeb) {
            alert("Установите расширение TronLink и авторизуйтесь!");
            return;
        }
    
        try {
            await window.tronWeb.request({ method: "tron_requestAccounts" });
    
            const walletAddress = window.tronWeb.defaultAddress.base58; 

            const { data: authData } = await api.post('/tron/verify_signature_and_login/', {
                wallet_address: walletAddress,
            });
            
            return { authData: authData, walletAddress: walletAddress }

        } catch (error) {
            console.error("Ошибка подключения TronLink:", error);
            return null;
        }
    }
} 