export const treatmentsService = {
    getTreatments() {
        return fetch('https://dominika-olszewska.github.io/spa-js/frontend/docs/database.json')
            .then(response => response.json());
    },

};
