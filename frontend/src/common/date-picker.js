import moment from "moment";
import {sessionStorageService} from "./session-storage-service";

export const createInputEl = (className) => {
    const input = document.createElement('input');
    input.type = 'date';
    input.className = className;
    const today = moment().format('YYYY-MM-DD');
    input.min = today;
    return input;
};

export const createStartInputEl = (className) => {
    return createInputEl(className);
};

export const createEndInputEl = (className, isDisabled) => {
    const input =  createInputEl(className);
    input.disabled = isDisabled;
    return input;
};

export const createDatePicker = () => {
    const form = document.createElement('form');
    let isEndInputDisabled = true;

    const startDateInput = createStartInputEl('startDateInput');
    const endDateInput = createEndInputEl('endDateInput', isEndInputDisabled);

    startDateInput.addEventListener('change', (event) => {
        const startDate = event.target.value;
        const endDate = endDateInput.value;
        if(endDate) {
            const stayDuration = moment(endDate).diff(moment(startDate), 'days');
            if(stayDuration < 1) {
                endDateInput.value = '';
                sessionStorageService.setItem('endDate', endDateInput.value);
            }
        }

        isEndInputDisabled = false;
        endDateInput.disabled = isEndInputDisabled;
        const min = moment(startDate, 'YYYY-MM-DD').add(1, 'days').format('YYYY-MM-DD');
        endDateInput.min = min;

        sessionStorageService.setItem('startDate', startDate);
    });

    endDateInput.addEventListener('change', (event) => {
        sessionStorageService.setItem('endDate', event.target.value);
    });

    form.append(startDateInput);
    form.append(endDateInput);
    return form;
};
