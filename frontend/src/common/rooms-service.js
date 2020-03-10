import mockData from '../../database';
export const roomsService = {

    // getRooms() {
    //   // pobiera liste wszystkich pokoi
    //   return fetch('http://localhost:3000/rooms')
    //     .then(response => response.json());
    // }

    getRooms() {
        // pobiera liste wszystkich pokoi
      const mockDatabase = new Request(mockData)
        return fetch(mockDatabase)
            .then(response => response.json())
            .then((data) => {
                console.log(data);
            });
    }

};
