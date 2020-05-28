import $ from 'jquery';
import '../styles/booking.scss';
import {sessionStorageService} from '../common/session-storage-service';
import {createDivEl, deleteFromSessionStorage,} from "./rooms";

const countPrice = () => {

}

const getElementsFromStorage = (storageKey, containerClass, elementClass) => {

    const storageRooms = sessionStorageService.getItem(storageKey);
    console.log(storageRooms);

    const bookedElementsList = document.createElement('div');
    bookedElementsList.className = containerClass;
    storageRooms
        ? storageRooms.map(storageRoom => {
            const storageElement = document.createElement('div');
            storageElement.className = 'storageElement';
            storageRoom.id = storageElement.id;
            createDivEl(elementClass, storageRoom.name, storageElement);
            createRemovalElement(storageElement, storageRoom, storageKey);
            return bookedElementsList.appendChild(storageElement);
        })
        : null;


    return bookedElementsList;
};

const createRemovalElement = (container, storageElement, keyInStorage) => {
    const removalEl = document.createElement('span');
    removalEl.className = 'removalEl';
    removalEl.innerHTML = ' x';

    removalEl.addEventListener('click', () => {
        console.log('delete', keyInStorage, storageElement);
        deleteFromSessionStorage(storageElement, keyInStorage);

    });
    return container.append(removalEl);

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

    const bookedRoomsList = getElementsFromStorage('rooms', 'bookedRoomsList', 'room' );
    const bookedTreatmentsList = getElementsFromStorage('treatments', 'bookedTreatmentsList', 'treatment' );

    const bookingWrapper = document.createElement('div');
    bookingWrapper.className = "bookingWrapper";

    const bookingsPage = document.createElement('div');
    bookingsPage.className = "bookingsPage";

    startDate ? bookingWrapper.appendChild(startDate) : null;
    endDate ? bookingWrapper.appendChild(endDate) : null;
    bookingWrapper.appendChild(bookedRoomsList);
    bookingWrapper.appendChild(bookedTreatmentsList);

    bookingsPage.appendChild(bookingWrapper);
    fragment
        .append(bookingsPage);

    return Promise.resolve(fragment);
};
