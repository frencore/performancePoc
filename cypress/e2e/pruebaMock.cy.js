describe("Mock con Cypress Commands", () => {
  it("Intercepta la API con mockPikachu y valida la UI", () => {
    // Llamamos al comando personalizado para interceptar la petición de Pikachu
    cy.mockPikachu();

    // Cargamos los selectores y datos desde el fixture
    cy.fixture("example.json").then((pageData) => {
      const { urlInput, searchButton } = pageData.selectors; // Selectores de la UI
      const { name } = pageData.pokemon; // Nombre del Pokémon

      // Visitamos la página principal
      cy.visit("/");

      // Interactuamos con la UI para buscar a Pikachu
      cy.get(urlInput)
        .should("be.visible") // Verificamos que el campo es visible
        .clear()
        .type(`pokemon/${name}`); // Escribimos el nombre del Pokémon

      cy.get(searchButton)
        .should("be.visible") // Verificamos que el botón está visible
        .click();
    });

    // Esperamos que la solicitud interceptada se complete
    cy.wait("@getPikachu");

    // Verificamos que los datos de Pikachu se muestran correctamente en la UI
    cy.contains("pikachu").should("be.visible");
    cy.contains("static").should("be.visible");
    cy.contains("electric").should("be.visible");

    // Verificamos que la URL de la imagen se muestra como texto en la UI
    cy.contains(
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
    ).should("be.visible");

    // Verificamos que la URL de la imagen esté dentro del contenedor JSON y se muestra correctamente
    cy.get(".JsonViewer-module__json--2OTYy")
      .should("be.visible") // Aseguramos que el contenedor está visible
      .and(
        "contain.text",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
      ); // Verificamos que la URL esté en el texto
  });
});
describe("Mock con Cypress Commands", () => {
    it("Intercepta la API con mockPikachu y valida la UI con respuesta 400", () => {
      // Llamamos al comando personalizado para interceptar la petición de Pikachu
      cy.mockPikachu(400); // Simulamos una respuesta 400 (Bad Request)
  
      // Cargamos los selectores y datos desde el fixture
      cy.fixture("example.json").then((pageData) => {
        const { urlInput, searchButton } = pageData.selectors; // Selectores de la UI
        const { name } = pageData.pokemon; // Nombre del Pokémon
  
        // Visitamos la página principal
        cy.visit("/");
  
        // Interactuamos con la UI para buscar a Pikachu
        cy.get(urlInput)
          .should("be.visible") // Verificamos que el campo es visible
          .clear()
          .type(`pokemon/${name}`); // Escribimos el nombre del Pokémon
  
        cy.get(searchButton)
          .should("be.visible") // Verificamos que el botón está visible
          .click();
      });
  
      // Esperamos que la solicitud interceptada se complete
      cy.wait("@getPikachu");
  
      // Verificamos que la UI maneja la respuesta 400 correctamente
      cy.contains("400 Bad Request").should("be.visible"); // Suponiendo que la UI muestra un mensaje de error
  
      // Verificamos que no se muestre el nombre del Pokémon ni otros detalles
      cy.contains("static").should("not.exist");
      cy.contains("electric").should("not.exist");
  
      // Verificamos que la URL de la imagen no se muestra en la UI
      cy.contains(
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
      ).should("not.exist");
    });
  });
  