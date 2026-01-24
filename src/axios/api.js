import axios from "axios";
//import { config } from "zod"; 


export const api = axios.create({
    baseURL: "/api", 
});

api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("token");
    if(token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
});