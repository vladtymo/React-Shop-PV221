import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL + "accounts/"
});

// ----- create service object
export const accountsService = {
    login: function (model) {
        return api.post('login', model);
    }
}