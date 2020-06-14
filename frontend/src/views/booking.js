import $ from 'jquery';
import '../styles/booking.scss';
import {sessionStorageService} from '../common/session-storage-service';
import {createButton, createButtonEl, createDivEl, deleteFromSessionStorage,} from "./rooms";

const countPrice = (key) => {
    const elements = sessionStorageService.getItem(key);
    if (elements && elements.length > 0) {
        const prices = elements.map(el => el.price);
        return prices.reduce((a, b) => a + b, 0)
    } else {
        return 0;
    }
};

const getElementsFromStorage = (storageKey, containerClass, elementClass, headerText) => {

    const storageRooms = sessionStorageService.getItem(storageKey);

    const bookedElementsList = document.createElement('div');
    bookedElementsList.className = containerClass;
    if (storageRooms && storageRooms.length > 0) {

        const header = document.createElement('div');
        header.className = 'header';
        header.innerHTML = headerText;
        bookedElementsList.append(header);
        storageRooms.map(storageRoom => {
            const storageElement = document.createElement('div');
            storageElement.className = 'storageElement';
            storageRoom.id = storageElement.id;
            createDivEl(elementClass, storageRoom.name, storageElement);
            createRemovalElement(storageElement, storageRoom, storageKey);
            return bookedElementsList.appendChild(storageElement);
        });
    }
    return bookedElementsList;
};

const createRemovalElement = (container, storageElement, keyInStorage) => {
    const removalEl = document.createElement('span');
    removalEl.className = 'removalEl';
    removalEl.innerHTML = ' x';

    removalEl.addEventListener('click', () => {
        deleteFromSessionStorage(storageElement, keyInStorage);
        location.reload();

    });
    return container.append(removalEl);

};


const getDateFromStorage = (key, name) => {

    const storageDay = sessionStorageService.getItem(key);

    if (storageDay) {
        const dateOfStay = document.createElement('div');
        dateOfStay.className = key;
        dateOfStay.innerHTML = name + storageDay;
        return dateOfStay;
    }
};

export const createOrderButtonEl = (name, container, id, className) => {

    const button = createButton(name, id, className);

    let elementsFromStorage = [];
    const keys = ['rooms', 'treatments', 'startDate', 'endDate'];

    keys.forEach(key => {
        const element = sessionStorageService.getItem(key);
        if (element && element !== []) {
            return elementsFromStorage.push(element);
        }
    });
    elementsFromStorage = elementsFromStorage.filter(element => {
        return element.length > 0;
    });

    button.disabled = elementsFromStorage.length < 4;

    button.addEventListener('click', () => {
        keys.forEach(key => {
            sessionStorage.removeItem(key);
        });
        window.alert('Your booking was successful');
        window.location.reload();
    });

    container?.appendChild(button);
};


export const booking = () => {
    const fragment = $(new DocumentFragment());

    const datesOfStay = document.createElement('div');
    datesOfStay.className = "datesOfStay";

    const startDate = getDateFromStorage('startDate', 'Date of your arrival: ');
    const endDate = getDateFromStorage('endDate', 'Date of your departure: ');

    const bookedRoomsList = getElementsFromStorage('rooms', 'bookedRoomsList', 'room', 'You can stay in:');
    const bookedTreatmentsList = getElementsFromStorage('treatments', 'bookedTreatmentsList', 'treatment', 'Your treatments:');

    const bookingWrapper = document.createElement('div');
    bookingWrapper.className = "bookingWrapper";

    const bookingsPage = document.createElement('div');
    bookingsPage.className = "bookingsPage";

    const bookingsHeader = document.createElement('div');
    bookingsHeader.className = "bookingsHeader";
    bookingsHeader.innerHTML = 'Your reservation';
    bookingWrapper.append(bookingsHeader);

    startDate ? bookingWrapper.appendChild(startDate) : null;
    endDate ? bookingWrapper.appendChild(endDate) : null;
    bookingWrapper.appendChild(bookedRoomsList);
    bookingWrapper.appendChild(bookedTreatmentsList);

    const totalPrice = countPrice('rooms') + countPrice('treatments');
    const totalPriceDiv = document.createElement('div');
    totalPriceDiv.className = "totalPriceDiv";
    totalPriceDiv.innerHTML = 'Total cost: ' + totalPrice;
    bookingWrapper.append(totalPriceDiv);

    createOrderButtonEl('Book', bookingWrapper, 'order-button', 'btnBookReservation');

    bookingsPage.appendChild(bookingWrapper);
    fragment
        .append(bookingsPage);

    return Promise.resolve(fragment);
};
