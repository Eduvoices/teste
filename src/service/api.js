import axios from "axios";

export const api = axios.create({
    baseURL: "https://tecjusbackend.vercel.app/login",
    });
