import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 500,
});

export default api;