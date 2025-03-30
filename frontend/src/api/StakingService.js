import api from "./ApiService";
import { apiURL } from "../constans";

export default class StakingService {
    static async stake(transactionHash) {
        try {
            const response = await api.post("/stake/", {
                th: String(transactionHash)
            });
            return response.data

        } catch (error) {
            console.error("Ошибка StakingService stake:", error);
            return null;
        }
    }
    static async unstake(transactionHash) {
        try {
            const response = await api.delete("/stake/", {
                data: { th: String(transactionHash) }
            });
            return response.data

        } catch (error) {
            console.error("Ошибка StakingService unstake:", error);
            return null;
        }
    }
    static async getTotalValues() {
        try {
            const response = await api.post("/get_total/")
            return response
        } catch (error) {
            console.error("Ошибка обновления значений: ", error)
        }
    }
    static async hasActiveStaking() {
        try {
            const response = await api.post("/has_active_staking/")
            return response
        } catch (error) {
            console.error("Error has_active_staking: ", error)
        }
    }
}