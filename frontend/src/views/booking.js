import $ from 'jquery';
import '../styles/booking.scss';
import {sessionStorageService} from '../common/session-storage-service';
import {createDivEl, createButtonEl} from "./rooms";

export const booking = () => {
    const fragment = $(new DocumentFragment());
    const storageRooms = sessionStorageService.getItem('rooms');

    const bookedRoomsList = document.createElement('div');
    bookedRoomsList.className = "bookedRoomsList";

    storageRooms
        ? storageRooms.map(storageRoom => {
            const storageElement = document.createElement('div');
            storageElement.className = 'storageElement';
            storageRoom.id = storageElement.id;
            createDivEl("name", storageRoom.name, storageElement);
            return bookedRoomsList.appendChild(storageElement);
        })
        : null;

    const bookingsPage = document.createElement('div');
    bookingsPage.className = "bookingsPage";
    bookingsPage.appendChild(bookedRoomsList);
    fragment
        .append(bookingsPage);

    return Promise.resolve(fragment);
};
