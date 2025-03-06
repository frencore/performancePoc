// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
/**
 * Realiza una solicitud GET a la API y almacena la respuesta en un alias dinámico.
 * 
 * @function apiGet
 * @param {string} endpoint - El endpoint de la API al que se desea hacer la solicitud (ej. 'ditto', 'pikachu').
 * @example
 *  Llamar al endpoint 'ditto' y almacenar la respuesta en @dittoData
 * cy.apiGet('ditto');
 * 
 *  Luego, en el test se puede acceder a los datos con:
 * cy.get('@dittoData').then((data) => {
 *     cy.log(data.abilities[0].ability.name);
 * });
 */
Cypress.Commands.add('apiGet', (endpoint) => {
    const aliasName = `${endpoint}Data`; // Genera un alias dinámico basado en el endpoint

    cy.request('GET', `${Cypress.env('urlApi')}/${endpoint}`).then((response) => {
        expect(response.status).to.equal(200);
        cy.log(JSON.stringify(response.body, null, 2)); // Imprime la respuesta JSON
        cy.wrap(response.body).as(aliasName); // Guarda la respuesta con alias dinámico
    });
});



