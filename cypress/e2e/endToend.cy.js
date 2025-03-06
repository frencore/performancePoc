describe("Búsqueda de Pokémon en PokeAPI", () => {
    it("Debe buscar un Pokémon usando el campo de búsqueda", () => {
      // Constantes para los selectores y valores repetidos
      const urlInput = "#url-input";
      const searchButton = 'button[type="submit"]';
      const messageElement = ".ApiExplorer-module__message--e4oy9";
      const jsonViewer = ".JsonViewer-module__code--2XOHn";
      const rawJsonInput = 'label > input';
  
      const pokemon = "pokemon/pikachu"; // Pokémon que estamos buscando
  
      // Visitar la página de PokeAPI
      cy.visit("/");
  
      // Encontrar el campo de búsqueda y escribir el nombre del Pokémon
      cy.get(urlInput).clear().type(pokemon);
  
      // Hacer clic en el botón de búsqueda 
      cy.get(searchButton).click();
  
      // Verificar que el resultado contiene el nombre del Pokémon
      cy.get(messageElement).should("include.text", "pikachu");
  
      // Hacer clic en 'View Raw JSON'
      cy.get(rawJsonInput).click();
  
      // Usamos el comando personalizado para guardar el JSON
      cy.guardarJsonDesdeElemento(jsonViewer, 'jsonResponse');
  
      // Usamos el alias para obtener el JSON y realizar aserciones
      cy.get('@jsonResponse').then((jsonResponse) => {
        // Imprimir el JSON extraído para verificar
        cy.log('JSON Response:', jsonResponse); 
  
        // Ejemplo de aserción sobre el JSON (ajustar según la estructura real)
        expect(jsonResponse).to.have.property('name', 'pikachu');
        expect(jsonResponse).to.have.property('id', 25); // Suponiendo que el id de Pikachu es 25
      });
    });
  });
  