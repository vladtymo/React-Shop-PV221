const accessTokenKey = "accessKey";
const refreshTokenKey = "refreshKey";

export const tokensService = {
    save: function (model) {
        localStorage.setItem(accessTokenKey, model.accessToken);
        localStorage.setItem(refreshTokenKey, model.refreshToken);
    },
    clear: function () {
        localStorage.removeItem(accessTokenKey);
        localStorage.removeItem(refreshTokenKey);
    },
    getAccessToken() {
        return localStorage.getItem(accessTokenKey);
    },
    getRefreshToken() {
        return localStorage.getItem(refreshTokenKey);
    }
}