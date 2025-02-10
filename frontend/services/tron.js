// const connectTronWallet = async () => {
//     if (!window.tronLink) {
//         alert("TronLink не найден! Убедитесь, что он установлен и открыт.");
//         return null;
//     }

//     const tronLink = window.tronLink;
//     console.log('tron:', tronLink)
//     const res = await tronLink.request({ method: "tron_requestAccounts" });

//     if (res.code === 200) {
//         console.log("✅ Подключен TronLink:", tronLink.tronWeb.defaultAddress.base58);
//         return tronLink.tronWeb.defaultAddress.base58;
//     } else {
//         alert("❌ Доступ к кошельку отклонён!");
//         return null;
//     }
// };

// export default connectTronWallet;
import { Constants } from "@/utils/common";
import axios from "axios";


const connectTronWallet = async () => {
    if (!window.tronLink) {
        alert("TronLink не найден! Убедитесь, что он установлен и открыт.");
        return null;
    }

    const tronLink = window.tronLink;
    const res = await tronLink.request({ method: "tron_requestAccounts" });

    if (res.code !== 200) {
        return null;
    }

    const walletAddress = tronLink.tronWeb.defaultAddress.base58;
    console.log("✅ Подключен TronLink:", walletAddress);

    try {
        // 1️⃣ Запрашиваем nonce у бэкенда
        const nonceResponse = await axios.post(`${Constants.API_URL}api/tron/login/`, {
            address: walletAddress,
        });
        console.log(nonceResponse.data)
    } catch (error) {
        console.error("Ошибка авторизации через Tron:", error.response?.data || error.message);
        return null;
    }
};

export default connectTronWallet;
