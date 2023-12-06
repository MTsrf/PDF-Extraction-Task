import axios from 'axios';
import { AlertService } from './app/service/alertService';
const url = process.env.REACT_APP_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',

    }
});

axiosInstance.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.data?.error) {
            AlertService.error(JSON.stringify(error.response.data.error), { keepAfterRouteChange: true, autoClose: false });
            return Promise.reject((error.response.data.error) || 'Something went wrong!');

        }
        else if (error.response?.data?.message) {

            if (!error.request.responseURL.toString().includes('tms'))
                AlertService.error(JSON.stringify(error.response.data.message), { keepAfterRouteChange: true, autoClose: false });
            return Promise.reject((error.response.data.message) || 'Something went wrong!');

        }
        else {
            AlertService.error(error.response.data.message, { keepAfterRouteChange: true, autoClose: false });
            return Promise.reject((error.response && error.response.data && error.response.data.message) || 'Something went wrong!');


        }


    }
);




export default axiosInstance;
