// export const treatmentsService = {
//     getTreatments() {
//         return fetch('https://dominika-olszewska.github.io/spa-js/frontend/database.json')
//             .then(response => response.json())
//             .then(data => {
//                 return data.treatments;
//             })
//     },
//
// };

export const treatmentsService = {
    getTreatments() {
        return fetch('http://localhost:3000/treatments')
            .then(response => response.json());
    },

};
