import $ from 'jquery';
import {roomsService} from '../common/rooms-service';
import {sessionStorageService} from '../common/session-storage-service';
import '../styles/rooms.scss';
import moment from "moment";
import {createDatePicker} from "../common/date-picker";

export const createDivEl = (className, roomElement, container, name = '') => {
    const el = document.createElement('div');
    el.className = className;
    name ? el.innerHTML = name + ': ' + roomElement : el.innerHTML = roomElement;
    container.append(el);
};

export const createButtonEl = (name, room, roomEl, addToStorage) => {
    const button = document.createElement('button');
    button.innerHTML = name;
    addToStorage
        ? button.addEventListener('click', () => {
            addToSessionStorage(room);
        })
        : button.addEventListener('click', () => {
            console.log('room to delete', room.name, room.id);
            deleteFromSessionStorage(room);
        });
    roomEl?.appendChild(button);
};

export const getRoomsFromStorage = () => {
    let rooms = sessionStorage.getItem('rooms') || [];
    if (rooms && (typeof rooms) !== "object") {
        rooms = JSON.parse(rooms)
    }
    return rooms;
};

export const addToSessionStorage = (room) => {
    let rooms = getRoomsFromStorage();
    const valuesInStorage = rooms?.filter(ROOM => room.id === ROOM.id);
    valuesInStorage?.length === 0 ? rooms.push(room) : null;
    sessionStorageService.setItem('rooms', rooms);
};

export const deleteFromSessionStorage = (room) => {
    let rooms = getRoomsFromStorage();
    const newRooms = rooms.filter(ROOM => {
        return ROOM.id !== room.id
    });
    sessionStorageService.setItem('rooms', newRooms);
};

export const createInputEl = (className) => {
    const input = document.createElement('input');
    input.type = 'date';
    input.className = className;
    const today = moment().format('YYYY-MM-DD');
    input.min = today;
    return input;
};

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

            createButtonEl('Plus', room, roomEl, true);
            createButtonEl('Minus', room, roomEl, false);

            createDivEl("beds", room.beds, roomEl, 'Beds');
            createDivEl("guests", room.guests, roomEl, 'Guests');
            createDivEl("price", room.price, roomEl, 'Price');

            return roomsList.appendChild(roomEl);

        });

        const roomsPage = document.createElement('div');
        roomsPage.className = "roomsPage";
        const datePicker = createDatePicker();
        roomsPage.append(datePicker);
        roomsPage.append(roomsList);

        fragment
            .append(roomsPage);


        return Promise.resolve(fragment);
    });
};

