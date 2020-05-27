import $ from 'jquery';
import {treatmentsService} from "../common/treatments-service";
import '../styles/treatments.scss';

export const treatments = () => {
  const fragment = $(new DocumentFragment());

  return treatmentsService.getTreatments().then(treatments => {

    const treatmentsPage = document.createElement('div');
    treatmentsPage.className = "treatmentsPage";

    fragment
        .append(treatmentsPage);

    return Promise.resolve(fragment);

  });


};
