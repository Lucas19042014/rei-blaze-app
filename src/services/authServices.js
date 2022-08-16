import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../../config';

const createApi = () => {
    return axios.create({
        baseURL: config.reiBlazeApi.host
    });
}

const login = async (email, password) => {
        const api = createApi();
        const response = await api.post('session', { email, password });

        return response.data;
}

const me = async () => {
    try {
        const sessionKey = Cookies.get('session_key');

        const api = createApi();
        const response = await api.get('users/me', {
            headers: {
                Authorization: `Bearer ${sessionKey}`
            }
        });

        return response.data;
    } catch (error) {
        return null;
    }
}

export default {
    login,
    me
}