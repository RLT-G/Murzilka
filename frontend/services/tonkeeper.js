import axios from "axios";
import { Constants } from "@/utils/common";
import { TonConnect } from "@tonconnect/sdk";



const tonkeeperAuth = async (tonConnect) => {
    try {
        const walletAddress = "...";

        const wallets = await tonConnect.getWallets();
        console.log("Доступные кошельки:", wallets);

        if (!wallets.length) {
            throw new Error("Нет доступных кошельков TonKeeper");
        }

        const tonkeeperWallet = wallets.find(w => w.appName === "tonkeeper");
        if (!tonkeeperWallet) {
            throw new Error("TonKeeper не найден в списке кошельков");
        }

        console.log("Выбранный кошелёк:", tonkeeperWallet);

        await tonConnect.connect({
            bridgeUrl: tonkeeperWallet.bridgeUrl,
            universalLink: tonkeeperWallet.universalLink
        });

        if (!tonConnect.wallet) {
            throw new Error("Ошибка подключения TonKeeper");
        }

        console.log("Кошелёк подключён:", tonConnect.wallet);

        const response = await axios.post(`${Constants.API_URL}api/tonkeeper/challenge/`, {
            wallet_address: walletAddress
        });

        const challenge = response.data.challenge;

        const result = await tonConnect.sendTransaction({
            messages: [{ address: walletAddress, amount: "0", payload: challenge }],
        });

        if (!result || !result.signature) {
            throw new Error("Ошибка при получении подписи");
        }

        const signature = result.signature;

        const access_token = await verifySignature(walletAddress, signature);

        console.log("Access Token:", access_token);

    } catch (error) {
        console.error("Ошибка при аутентификации через TonKeeper:", error);
    }
};

const verifySignature = async (walletAddress, signature) => {
    const response = await axios.post("/api/tonkeeper/verify_signature_and_login/", {
        wallet_address: walletAddress,
        signature: signature
    });

    return response.data.access_token;
};

export default tonkeeperAuth;
