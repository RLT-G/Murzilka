import axiosInstance from "../plugins/axios";


const profileService = {

    getAllProfiles: async (token) => {
        try {
            axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
            const {data} = await axiosInstance.get(`/profile/all`);
            return [data, null];
        } catch (error) {
            return [null, error];
        }
    },

    getCurrentProfile: async () => {
        try {
            const {data} = await axiosInstance.get(`/profile/current`);
            return [data, null];
        } catch (error) {
            return [null, error];
        }
    },

    authProfile: async (payload) => {
        try {
            axiosInstance.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            const {data} = await axiosInstance.post(`/token`, payload);
            return [data, null];
        } catch (error) {
            return [null, error];
        }
    },

    createProfile: async (payload) => {
        try {
            axiosInstance.defaults.headers['Content-Type'] = 'application/json';
            const {data} = await axiosInstance.post(`/profile/create`, payload);
            return [data, null];
        } catch (error) {
            return [null, error];
        }
    },

    unstakeCoins: async (coins) => {
        try {
            axiosInstance.defaults.headers['Content-Type'] = 'application/json';
            const {data} = await axiosInstance.put(`/profile/unstake`, coins);
            return [data, null];
        } catch (error) {
            return [null, error];
        }
    },

    checkCookie: async () => {
        try {
            const {data} = await axiosInstance.get(`/check_cookie`);
            return [data, null];
        } catch (error) {
            return [null, error];
        }
    },

    logoutProfile: async () => {
        try {
            const {data} = await axiosInstance.post(`/profile/logout`);
            return [data, null];
        } catch (error) {
            return [null, error];
        }
    },

    getHistory: async () => {
        try {
            const {data} = await axiosInstance.get(`/profile/get_history`);
            return [data, null];
        } catch (error) {
            return [null, error];
        }
    }

};

export default profileService;
