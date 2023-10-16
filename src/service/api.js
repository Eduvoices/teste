import axios from "axios";

const api = axios.create({
    baseURL: "https://tecjusbackend.vercel.app/login",
    });

    export default api;
