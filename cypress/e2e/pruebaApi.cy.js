


describe('pruebas de apis', () => {

    it('Debe obtener y usar datos de Ditto', () => {
        cy.apiGet('ditto'); // Llamada a la API y almacenamiento en alias "dittoData"

        cy.get('@dittoData').then((data) => {
            cy.log('Primera habilidad: ' + data.abilities[0].ability.name);
            cy.log('Segunda habilidad: ' + data.abilities[1].ability.name);
            cy.log('Peso: ' + data.weight + 'kg');
        });
    });

    it('Debe obtener y usar datos de Pikachu', () => {
        cy.apiGet('pikachu'); // Llamada a la API y almacenamiento en alias "pikachuData"

        cy.get('@pikachuData').then((data) => {
            cy.log('Primera habilidad: ' + data.abilities[0].ability.name);
            cy.log('Segunda habilidad: ' + data.abilities[1].ability.name);
            cy.log('Peso: ' + data.weight + 'kg');
        });
    });
});