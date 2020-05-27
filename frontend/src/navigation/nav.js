import $ from 'jquery';
import { routeChange } from '../router/route-change';
import { routes } from '../router/routes';
import { navItem } from './nav-item';
import '../styles/nav.scss';

export const nav = () => {
  const navbar = $(`
    <nav class="navbar-spa ">
      <span class="navbar-logo">IT SPA</span>
      <ul class="menu"></ul>
    </nav>
  `);

  const navItems = routes.map(route => {
    const { name, path } = route;
    return navItem(name, () => navbar.trigger(routeChange, { path: path }));
  });

  navbar.find('ul').append(navItems);

  return navbar;
};
