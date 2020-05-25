import $ from 'jquery';
import {roomsService} from '../common/rooms-service';
import {sessionStorageService} from '../common/session-storage-service';
import '../styles/rooms.scss';

const createDivEl = (className, roomElement, container, name = '') => {
    const el = document.createElement('div');
    el.className = className;
    name ? el.innerHTML = name + ': ' + roomElement : el.innerHTML = roomElement;
    container.append(el);
};

const createButtonEl = (name, room, roomEl) => {
    const button = document.createElement('button');
    button.innerHTML = 'Plus';
    button.addEventListener('click', () => {
        console.log('room from Room Page', room);
        addToSessionStorage(room);
    });
    roomEl?.appendChild(button);

};

const addToSessionStorage = (room) => {
    let rooms = sessionStorage.getItem('rooms');

    if (typeof Storage === "undefined") {
        rooms = [];
    }
    if(rooms && (typeof rooms) !== "object") {
        rooms=JSON.parse(rooms)
    }
    // const valuesInStorage = rooms?.filter( ROOM => room.id === ROOM.id);
    // !valuesInStorage || valuesInStorage?.length === 0 ? rooms.push(room) : null;
    rooms.push(room);
    sessionStorageService.setItem('rooms', rooms);
}

export const rooms = () => {
    const fragment = $(new DocumentFragment());
    return roomsService.getRooms().then(rooms => {
        console.log(rooms);
        const roomsList = document.createElement('div');
        roomsList.className = "roomsList";

        rooms.map(room => {
            const roomEl = document.createElement('div');
            roomEl.className = 'room';
            roomEl.id = room.id;
            createDivEl("name", room.name, roomEl);

            createButtonEl('Plus', room, roomEl);

            createDivEl("beds", room.beds, roomEl, 'Beds');
            createDivEl("guests", room.guests, roomEl, 'Guests');
            createDivEl("price", room.price, roomEl, 'Price');

            return roomsList.appendChild(roomEl);

        });
        const roomsPage = document.createElement('div');
        roomsPage.className = "roomsPage";
        roomsPage.append(roomsList);
        console.log('newList', roomsList);
        fragment
            .append(roomsPage);

        return Promise.resolve(fragment);
    });
};

