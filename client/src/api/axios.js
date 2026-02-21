import axios from 'axios';

const API = axios.create({
    baseURL: 'https://habit-flow-p8mk.onrender.com/api',
});

// Attach JWT token to every request
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;
