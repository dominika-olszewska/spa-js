import $ from 'jquery';
import '../styles/booking.scss';
import {sessionStorageService} from '../common/session-storage-service';
import {createDivEl} from "./rooms";

const getRoomsFromStorage = () => {

    const storageRooms = sessionStorageService.getItem('rooms');

    const bookedRoomsList = document.createElement('div');
    bookedRoomsList.className = "bookedRoomsList";
    storageRooms
        ? storageRooms.map(storageRoom => {
            const storageElement = document.createElement('div');
            storageElement.className = 'storageElement';
            storageRoom.id = storageElement.id;
            createDivEl("room", storageRoom.name, storageElement);
            return bookedRoomsList.appendChild(storageElement);
        })
        : null;
    return bookedRoomsList;
};

const getDateFromStorage = (key) => {

    const storageDay = sessionStorageService.getItem(key);

    if (storageDay) {
        const dateOfStay = document.createElement('div');
        dateOfStay.className = key;
        dateOfStay.innerHTML = storageDay;
        return dateOfStay;
    }


};

export const booking = () => {
    const fragment = $(new DocumentFragment());

    const datesOfStay = document.createElement('div');
    datesOfStay.className = "datesOfStay";
    const startDate = getDateFromStorage('startDate');
    const endDate = getDateFromStorage('endDate');
    console.log(startDate);

    const bookedRoomsList = getRoomsFromStorage();

    const bookingsPage = document.createElement('div');
    bookingsPage.className = "bookingsPage";
    startDate ? bookingsPage.appendChild(startDate) : null;
    endDate ? bookingsPage.appendChild(endDate) : null;
    bookingsPage.appendChild(bookedRoomsList);
    fragment
        .append(bookingsPage);

    return Promise.resolve(fragment);
};
