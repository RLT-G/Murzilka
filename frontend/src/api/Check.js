import axios from 'axios';
import { apiURL } from '../constans';

const checkApi = async () => {
    const response = await axios.get(`${apiURL}/check/`);
    return response.data.status
};

export default checkApi