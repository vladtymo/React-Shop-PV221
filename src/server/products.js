import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL + "products/"
});

// ----- create service object
export const productsService = {
    get: function () {
        return api.get('all');
    },
    getCategories: function () {
        return api.get('categories');
    },
    create: function (model) {

        const formData = new FormData();

        for (const key in model) {
            formData.append(key, model[key]);
        }

        return api.post("", formData);
    },
    delete: function (id) {
        return api.delete(`${id}`);
    }
}

// or create separate functions
// export function getProducst() {
// }
// export function createProduct(product) { 
// }