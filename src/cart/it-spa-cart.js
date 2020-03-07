import $ from 'jquery';
import { Cart } from "./cart";

export const itSpaCart = () => {
  const cart = new Cart();
  const fragment = $(new DocumentFragment());

  cookieStore.addEventListener('change', (event) => {
      // jesli zaistniala zmiana w cookies,
      // ponownie pobieram zawartosc kosza
      const nowaZawartosc = cart.get();

      // ...i poprawiam wyswietlane przez kosz informacje
      // TODO: zaktualizuj to co wyswietla obecnie koszyk
  });

  // return fragment;
};