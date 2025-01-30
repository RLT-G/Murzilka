import profileService from "@/services/profile";
import {state} from "@/store";


const profileActions = {

    getCurrentProfile: async () => {
        const [profile, error] = await profileService.getCurrentProfile();
        if (error) {
            throw new Error(error);
        }
        profileActions.setProfile(profile);
        return profile;
    },

    authProfile: async (payload) => {
        const obj = {
            username: payload,
            password: 1234
        }
        const [token, error] = await profileService.authProfile(obj);
        if (error) {
            if (error?.response?.status === 404) {
                throw error
            } else {
                throw new Error(error);
            }
        }
        return token;
    },

    createProfile: async (profile_wallet) => {
        const obj = {
            "wallet": profile_wallet
        }
        const [token, error] = await profileService.createProfile(obj);
        if (error) {
            throw new Error(error);
        }
        return token;
    },

    stakeCoins: async (coins) => {
        const [status, error] = await profileService.stakeCoins(coins);
        if (error) {
            throw new Error(error);
        }
    },

    unstakeCoins: async (coins) => {
        const [status, error] = await profileService.unstakeCoins(coins);
        if (error) {
            throw new Error(error);
        }
    },

    checkCookie: async () => {
        const [status, error] = await profileService.checkCookie();
        if (error) {
            if (error?.response?.status === 401) {
                return false
            } else {
                throw new Error(error);
            }
        }
        return true
    },

    logoutProfile: async () => {
        const [status, error] = await profileService.logoutProfile();
        if (error) {
            throw new Error(error);
        }
        return status;
    },

    getHistory: async () => {
        const [data, error] = await profileService.getHistory();
        if (error) {
            throw new Error(error);
        }
        profileActions.setHistory(data)
    },

    setProfile: (profile) => {
        state.profile = profile;
    },

    setHistory: (history) => {
        state.history = history;
    },

};

export default profileActions;
