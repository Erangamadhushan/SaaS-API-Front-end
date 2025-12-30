import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api'
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            const refreshToken = localStorage.getItem('refreshToken');
            console.log("Refreshing token with refresh token:", refreshToken);

            const res = await axios.post('http://localhost:5000/api/auth/refresh-token', {
                refreshToken: refreshToken
            });

            console.log("New token received:", res.data.data.accessToken);
            console.log("New refresh token received:", res.data.data.refreshToken);

            localStorage.setItem('authToken', res.data.data.accessToken);
            localStorage.setItem('refreshToken', res.data.data.refreshToken);

            error.config.headers['Authorization'] = `Bearer ${res.data.data.accessToken}`;

            return api.request(error.config);
        }

        return Promise.reject(error);
    }
);

export default api;