import $ from 'jquery';
import { routeChange } from '../router/route-change';
import { routes } from '../router/routes';
import { navItem } from './nav-item';

export const nav = () => {
  const navbar = $(`
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <span class="navbar-brand">IT SPA</span>
      <ul class="navbar-nav mr-auto"></ul>
    </nav>
  `);

  // chcemy zbudowac tablice elementow navItem z odpowiednimi nazwami i callbackami
  const navItems = routes.map(route => {
    const { name, path } = route;
    return navItem(name, () => navbar.trigger(routeChange, { path: path }));
  });

  navbar.find('ul').append(navItems);

  return navbar;
};
