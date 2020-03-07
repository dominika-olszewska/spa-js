import $ from 'jquery';
import { roomsService } from '../common/rooms-service';

export const rooms = () => {
  const fragment = $(new DocumentFragment());

  return roomsService.getRooms().then(pokoje => {
    return fragment
    .append('<h2>Rooms</h2>')
    .append(`<p>Pierwszy pokoj: ${pokoje[0].name}</p>`)
    .append('<p>Lorem ipsum dolor sit amet...</p>');
  });
};
