import $ from 'jquery';
import '../styles/nav.scss';

export const navItem = (text, click) => {
  const navItem = $('<li class="nav-item"></li>');
  const anchor = $('<a class="nav-link"></a>');
  anchor.text(text).on('click', click);

  navItem.append(anchor);

  return navItem;
};
