import $ from 'jquery';
import {roomsService} from '../common/rooms-service';
import {sessionStorageService} from '../common/session-storage-service';
import '../styles/rooms.scss';
import moment from "moment";
import {createDatePicker} from "../common/date-picker";

export const createDivEl = (className, element, container, name = '') => {
    const el = document.createElement('div');
    el.className = className;
    name ? el.innerHTML = name + ': ' + element : el.innerHTML = element;
    container.append(el);
};

export const createButtonEl = (name, element, container, addToStorage) => {
    const button = document.createElement('button');
    button.innerHTML = name;
    addToStorage
        ? button.addEventListener('click', () => {
            addToSessionStorage(element);
        })
        : button.addEventListener('click', () => {
            console.log('room to delete', element.name, element.id);
            deleteFromSessionStorage(element);
        });
    container?.appendChild(button);
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
    return new Promise((resolve, reject) => {
        roomsService.getRooms().then(data => {
            const rooms = data.rooms;
            console.log(rooms);

            const roomsList = document.createElement('div');
            roomsList.className = "roomsList";

            rooms.map(room => {
                const roomContainer = document.createElement('div');
                roomContainer.className = 'room';
                roomContainer.id = room.id;
                createDivEl("name", room.name, roomContainer);

                createButtonEl('Plus', room, roomContainer, true);
                createButtonEl('Minus', room, roomContainer, false);

                createDivEl("beds", room.beds, roomContainer, 'Beds');
                createDivEl("guests", room.guests, roomContainer, 'Guests');
                createDivEl("price", room.price, roomContainer, 'Price');

                return roomsList.appendChild(roomContainer);

            });

            const roomsPage = document.createElement('div');
            roomsPage.className = "roomsPage";
            const datePicker = createDatePicker();
            roomsPage.append(datePicker);
            roomsPage.append(roomsList);

            fragment
                .append(roomsPage);


            resolve(fragment);
        })
            .catch(err => reject(err))
    })
};

