import $ from 'jquery';

export const treatments = () => {
  const fragment = $(new DocumentFragment());

  fragment
    .append('<h2>Treatments</h2>')
    .append('<p>Lorem ipsum dolor sit amet...</p>');

  return fragment;
};
