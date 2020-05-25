import $ from 'jquery';
import {roomsService} from '../common/rooms-service';
import '../styles/rooms.scss';

export const rooms = () => {
    const fragment = $(new DocumentFragment());
    return roomsService.getRooms().then(rooms => {
        console.log(rooms);
        const roomsList = document.createElement('div');
        roomsList.className = "roomsList";

        rooms.map(room => {
            const container = document.createElement('div');
            container.className = 'room';
            const roomName = document.createElement('div');
            roomName.className = "name";
            roomName.innerHTML = room.name;
            container.append(roomName);

            const roomBeds = document.createElement('div');
            roomBeds.className = "beds";
            roomBeds.innerHTML = 'Beds ' + room.beds;
            container.append(roomBeds);

            container.append('<div class="guests">' + room.guests + '</div>');
            container.append('<div class="price">' + room.price + '</div>');

            return roomsList.appendChild(container);

        });
        const roomsPage = document.createElement('div');
        roomsPage.className = "roomsPage";
        roomsPage.append(roomsList);
        console.log('newList', roomsList);
        fragment
            .append(roomsPage)
        return Promise.resolve(fragment);
    });
};

