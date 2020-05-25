export const roomsService = {
    getRooms() {
        return fetch('http://localhost:3000/rooms')
            .then(response => response.json());
    },

};
