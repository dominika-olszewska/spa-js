import $ from 'jquery';
import {treatmentsService} from "../common/treatments-service";
import '../styles/treatments.scss';
import {createButtonEl, createDivEl} from "./rooms";

export const treatments = () => {
    const fragment = $(new DocumentFragment());

    return new Promise((resolve, reject) => {
        treatmentsService.getTreatments().then(data => {
            const treatments = data.treatments;

            const treatmentsList = document.createElement('div');
            treatmentsList.className = "treatmentsList";

            treatments.map(treatment => {
                const treatmentContainer = document.createElement('div');
                treatmentContainer.className = 'treatment';
                treatmentContainer.id = treatment.id;

                createButtonEl('+', treatment, treatmentContainer, true,'treatments', 'button-plus', 'active');
                createButtonEl('-', treatment, treatmentContainer, false, 'treatments', 'button-minus', '');


                createDivEl("name", treatment.name, treatmentContainer);
                createDivEl("area", treatment.area, treatmentContainer, 'Area');
                createDivEl("price", treatment.price, treatmentContainer, 'Price');
                createDivEl("time", treatment.time, treatmentContainer, 'Time');

                return treatmentsList.appendChild(treatmentContainer);

            });

            const treatmentsPage = document.createElement('div');
            treatmentsPage.className = "treatmentsPage";

            treatmentsPage.append(treatmentsList);

            fragment
                .append(treatmentsPage);


            resolve(fragment);
        })
            .catch(err => reject(err));
    })
};
