import moment from "moment";
import {sessionStorageService} from "./session-storage-service";

export const createInputEl = (className, isMaxSet) => {
    const input = document.createElement('input');
    input.type = 'date';
    input.className = className;
    const today = moment().format('YYYY-MM-DD');
    input.min = today;
    const max = moment(today, 'YYYY-MM-DD').add(1, 'years').format('YYYY-MM-DD');
    isMaxSet ? input.max = max : input;
    return input;
};

export const createStartInputEl = (className) => {
    const storageStartDay = sessionStorageService.getItem('startDate');
    const input = createInputEl(className, false);
    storageStartDay ? input.value = storageStartDay : input.value;
    return input;
};


export const createEndInputEl = (className, isDisabled) => {
    const storageStartDay = sessionStorageService.getItem('startDate');
    const storageEndDay = sessionStorageService.getItem('endDate');
    const input = createInputEl(className, true);
    input.disabled = isDisabled;

    if (storageEndDay || storageEndDay === "") {
        input.value = storageEndDay;
        input.disabled = false;

        clearEndInput(storageStartDay, storageEndDay, input);

        input.min = moment(storageStartDay, 'YYYY-MM-DD').add(1, 'days').format('YYYY-MM-DD');
        input.max = moment(storageStartDay, 'YYYY-MM-DD').add(1, 'years').format('YYYY-MM-DD');
    }
    return input;
};

export const clearEndInput = (startDate, endDate, input) => {
    const stayDuration = moment(endDate).diff(moment(startDate), 'days');
    if (stayDuration < 1) {
        input.value = '';
        sessionStorageService.setItem('endDate', input.value);
    }
};

export const onStartInputChange = (isEndInputDisabled, startDateInput, endDateInput) => {
    startDateInput.addEventListener('change', (event) => {
        const startDate = event.target.value;
        const endDate = endDateInput.value;

        if (endDate) {
            clearEndInput(startDate, endDate, endDateInput);
        }

        isEndInputDisabled = false;
        endDateInput.disabled = isEndInputDisabled;

        endDateInput.min = moment(startDate, 'YYYY-MM-DD').add(1, 'days').format('YYYY-MM-DD');
        endDateInput.max = moment(startDate, 'YYYY-MM-DD').add(1, 'years').format('YYYY-MM-DD');

        sessionStorageService.setItem('startDate', startDate);
    });
};

export const onEndInputChange = (endDateInput) => {
    endDateInput.addEventListener('change', (event) => {
        sessionStorageService.setItem('endDate', event.target.value);
    });
};

export const createDatePicker = () => {
    const form = document.createElement('form');

    let isEndInputDisabled = true;
    const startDateInput = createStartInputEl('startDateInput');
    const endDateInput = createEndInputEl('endDateInput', isEndInputDisabled);

    onStartInputChange(isEndInputDisabled, startDateInput, endDateInput);
    onEndInputChange(endDateInput);

    const startLabel = document.createElement('span');
    startLabel.className = 'startLabel';
    startLabel.innerHTML = 'Arrival day';

    const endLabel = document.createElement('span');
    endLabel.className = 'endLabel';
    endLabel.innerHTML = 'Departure day';

    form.append(startLabel);
    form.append(startDateInput);
    form.append(endLabel);
    form.append(endDateInput);
    return form;
};
