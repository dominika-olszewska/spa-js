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

export const createButtonEl = (name, element, container, addToStorage, keyInStorage, id, className) => {
    const button = document.createElement('button');
    button.innerHTML = name;
    button.id = id;
    button.className = className;
    addToStorage
        ? button.addEventListener('click', () => {
            addToSessionStorage(element, keyInStorage);
        })
        : button.addEventListener('click', () => {
            deleteFromSessionStorage(element, keyInStorage);
        });
    container?.appendChild(button);
};

export const getElementsFromStorage = (keyInStorage) => {
    let elements = sessionStorage.getItem(keyInStorage) || [];
    if (elements && (typeof elements) !== "object") {
        elements = JSON.parse(elements)
    }
    return elements;
};

export const addToSessionStorage = (element, keyInStorage) => {
    let elements = getElementsFromStorage(keyInStorage);
    const valuesInStorage = elements?.filter(EL => element.id === EL.id);
    valuesInStorage?.length === 0 ? elements.push(element) : null;
    sessionStorageService.setItem(keyInStorage, elements);
};

export const deleteFromSessionStorage = (element, keyInStorage) => {
    let elements = getElementsFromStorage(keyInStorage);
    const newElements = elements.filter(EL => {
        return EL.id !== element.id
    });
    sessionStorageService.setItem(keyInStorage, newElements);
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

            const roomsList = document.createElement('div');
            roomsList.className = "roomsList";

            rooms.map(room => {
                const roomContainer = document.createElement('div');
                roomContainer.className = 'room';
                roomContainer.id = room.id;
                createDivEl("name", room.name, roomContainer);

                createButtonEl('+', room, roomContainer, true, 'rooms', 'button-plus', 'active');
                createButtonEl('-', room, roomContainer, false, 'rooms', 'button-minus', '');

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

