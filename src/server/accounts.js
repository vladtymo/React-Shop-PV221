import axios from "axios";
import { tokensService } from "./tokens";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL + "accounts"
});

// ----- create service object
export const accountsService = {
    login: function (model) {
        return api.post('login', model);
    },
    logout: async function () {
        const refreshToken = tokensService.getRefreshToken();
        tokensService.clear();

        if (refreshToken)
            await api.post('logout', { refreshToken });
    }
}