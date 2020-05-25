import $ from 'jquery';
import {sessionStorageService} from '../common/session-storage-service';

export const booking = () => {
    const fragment = $(new DocumentFragment());
    const storage = sessionStorageService.getItem('rooms');
    console.log('storage', storage);
    console.log('storage typof', typeof storage);
    fragment
        .append('<h2>Booking</h2>')
        .append('<p>Lorem ipsum dolor sit amet...</p>')
        .append('storage', storage);

    return Promise.resolve(fragment);
};
