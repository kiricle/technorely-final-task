import axios, { type CreateAxiosDefaults } from 'axios';
import { getAccessToken, removeFromStorage } from '../services/token.service';
import { errorCatch } from './errors';

const options: CreateAxiosDefaults = {
    baseURL: 'http://localhost:9000/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
};

const axiosClassic = axios.create(options);

const axiosWithAuth = axios.create(options);

axiosWithAuth.interceptors.request.use((config) => {
    const accessToken = getAccessToken();

    if (config?.headers && accessToken)
        config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
});

axiosWithAuth.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalRequest = error.config;

        if (
            (error?.response?.status === 401 ||
                errorCatch(error) === 'jwt expired' ||
                errorCatch(error) === 'jwt must be provided') &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true;
            if (errorCatch(error) === 'jwt expired') removeFromStorage();
        }

        throw error;
    }
);

export { axiosClassic, axiosWithAuth };
