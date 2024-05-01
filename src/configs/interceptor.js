import axios from "axios";
import { tokensService } from "../server/tokens";

// export const baseApi = axios.create({
//     baseURL: process.env.REACT_APP_API_URL
// });

// baseApi.interceptors.request.use(
//     (config) => {
//         // Get token and add it to header "Authorization" from secure storgage
//         const token = tokensService.getAccessToken();
//         console.log(token);
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );