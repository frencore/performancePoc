describe("Búsqueda de Pokémon en PokeAPI", () => {
  it("Debe buscar un Pokémon usando el campo de búsqueda", () => {
    // Cargar los datos del archivo JSON
    cy.fixture("example.json").then((pageData) => {
      // Extraer selectores y valores del JSON
      const {
        urlInput,
        searchButton,
        messageElement,
        jsonViewer,
        rawJsonInput,
      } = pageData.selectors;
      const { name, id } = pageData.pokemon;

      // Visitar la página de PokeAPI
      cy.visit("/");

      // Encontrar el campo de búsqueda y escribir el nombre del Pokémon
      cy.get(urlInput)
        .clear()
        .type("pokemon/" + name);

      // Hacer clic en el botón de búsqueda
      cy.get(searchButton).click();

      // Verificar que el resultado contiene el nombre del Pokémon
      cy.get(messageElement).should("include.text", name);

      // Hacer clic en 'View Raw JSON'
      cy.get(rawJsonInput).click();

      // Usamos el comando personalizado para guardar el JSON
      cy.guardarJsonDesdeElemento(jsonViewer, "jsonResponse");

      // Usamos el alias para obtener el JSON y realizar aserciones
      cy.get("@jsonResponse").then((jsonResponse) => {
        // Imprimir el JSON extraído para verificar
        cy.log("JSON Response:", jsonResponse);

        // Ejemplo de aserción sobre el JSON (ajustar según la estructura real)
        expect(jsonResponse).to.have.property("name", name);
        expect(jsonResponse).to.have.property("id", id); // Suponiendo que el id de Pikachu es 25
      });
    });
  });
});
