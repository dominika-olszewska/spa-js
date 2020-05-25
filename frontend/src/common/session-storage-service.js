export const sessionStorageService = {

    setItem(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value));
    },

    getItem(key) {
        const value = sessionStorage.getItem(key);
        return JSON.parse(value);
    }


};
