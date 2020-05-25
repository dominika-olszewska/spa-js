import $ from 'jquery';
import '../styles/nav.scss';


// spodziewamy sie funkcji click, ktora bedzie wywolywana przez element anchor
// chcemy, aby klikniecie w element anchor powodowalo nawigacje do innej sciezki
export const navItem = (text, click) => {
  const navItem = $('<li class="nav-item"></li>');
  const anchor = $('<a class="nav-link"></a>');
  anchor.text(text).on('click', click);


  navItem.append(anchor);

  return navItem;
};
