import $ from 'jquery';
import {treatmentsService} from "../common/treatments-service";
import '../styles/treatments.scss';

export const treatments = () => {
    const fragment = $(new DocumentFragment());

    return new Promise((resolve, reject) => {
        treatmentsService.getTreatments().then(data => {
            const treatments = data.treatments;

            treatments.map(treatment => {

            });

            const treatmentsPage = document.createElement('div');
            treatmentsPage.className = "treatmentsPage";

            fragment
                .append(treatmentsPage);


            resolve(fragment);
        })
            .catch(err => reject(err));
    })
};
