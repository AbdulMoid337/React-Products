import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE1_URL
});

export default instance;
