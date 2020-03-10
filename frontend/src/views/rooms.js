import $ from 'jquery';
import mockData from '../../database';
import {roomsService} from '../common/rooms-service';

// export const rooms = () => {
//   const fragment = $(new DocumentFragment());
//}
//   return roomsService.getRooms().then(rooms => {
//     fragment
//     .append('<h2>Rooms</h2>')
//     .append(`<p>Pierwszy pokoj: ${rooms[0].name}</p>`)
//     .append('<p>Lorem ipsum dolor sit amet...</p>');
//
//     return Promise.resolve(fragment);
//   });
// };
export const rooms = () => {
    const fragment = $(new DocumentFragment());
    const roomList = mockData.rooms.map(room => room.name);

    fragment
        .append('<h2>Rooms</h2>')
        .append('<p>Lorem ipsum </p>')
        .append('<ul class="roomList"></ul>')

    fragment.find('ul').append(roomList)
    return Promise.resolve(fragment);
};


// export const rooms = () => {
//     const fragment = $(new DocumentFragment());
//     const roomsToDisplay = roomsService.getRooms().then(rooms => {
//         console.log(rooms);
//       fragment
//           .append('<h2>Rooms</h2>')
//           .append('<p>Lorem ipsum </p>')
//           .append('<p>${rooms}</p>');
//     });
//
//
//
//     // fragment
//     //     .append('<h2>Rooms</h2>')
//     //     .append('<p>Lorem ipsum </p>')
//     //     .append('<p>${roomsToDisplay}</p>');
//
//     // return Promise.resolve(fragment);
//     return roomsToDisplay;
// };

