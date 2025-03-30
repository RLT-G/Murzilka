import api from "./ApiService";
import Web3 from "web3";
import axios from "axios";
import { STAKING_ABI, STAKING_CONTRACT_ADDRESS, TOKEN_ABI, TOKEN_CONTRACT_ADDRESS } from "../constans";
import StakingService from "./StakingService";
import { TonConnect } from "@tonconnect/sdk";


const tonConnect = new TonConnect({
    manifestUrl: "https://raw.githubusercontent.com/RLT-G/test/refs/heads/main/test.json" 
});

export class TonkeeperService {

    static async loginViaTonkeeper() {
        try {
            const wallets = await tonConnect.getWallets();
            console.log('Доступные кошельки:', wallets);

            const tonkeeper = wallets.find(wallet => wallet.name === 'Tonkeeper');
            if (!tonkeeper) {
                throw new Error('Tonkeeper не найден среди доступных кошельков.');
            }

            const link = tonConnect.connect({ universalLink: tonkeeper.universalLink, jsBridgeKey: tonkeeper.appName });

            console.log('Открываю Tonkeeper:', link);
            window.open(link, '_blank'); 

            const walletAddress = await this.getWalletAddress()
            
            const { data: authData } = await api.post('/tonkeeper/verify_signature_and_login/', {
                wallet_address: walletAddress,
            });
            
            return { authData: authData, walletAddress: walletAddress }
        } catch (error) {
            console.error("Ошибка авторизации через Tonkeeper:", error);
            return null;
        }
    }
    static async getWalletAddress() {
        return new Promise((resolve, reject) => {
            tonConnect.onStatusChange((walletInfo) => {
                try {
                    const walletAddress = walletInfo.account.address
                    resolve(walletAddress)
                } catch (error) {
                    reject(null)
                }
            });
        });
    }
    static async disconnect() {
        await tonConnect.disconnect();
    }
}
