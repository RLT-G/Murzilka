import axios from "axios";
import { Constants } from "@/utils/common";


const tonkeeperAuth = async () => {
    try {
        const walletAddress = "EQC6..."; 

        const response = await axios.post(`${Constants.API_URL}tonkeeper/challange/`, {
            wallet_address: walletAddress
        });

        const challenge = response.data.challenge;

        const signUrl = `ton://sign/${challenge}?wallet=${walletAddress}`;
        window.open(signUrl, "_blank");
    } catch (error) {
        console.error("Ошибка при аутентификации через TonKeeper:", error);
    }
};


export default tonkeeperAuth;