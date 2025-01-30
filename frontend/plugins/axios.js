import axios from 'axios';
import {Constants} from "@/utils/common";

const axiosInstance = axios.create({
    withCredentials: true,
    timeout: 10000,
    baseURL: Constants.API_URL,
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json'
    }
});

export default axiosInstance;
