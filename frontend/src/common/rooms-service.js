export const roomsService = {
    getRooms() {
        return fetch('https://dominika-olszewska.github.io/spa-js/frontend/database.json')
            .then(response => response.json());
    },

};
