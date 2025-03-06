describe("Búsqueda de Pokémon en PokeAPI", () => {
  it("Debe buscar un Pokémon usando el campo de búsqueda", () => {
    // Cargar los datos del archivo JSON (ej. selectores y valores)
    cy.fixture("example.json").then((pageData) => {
      // Extraer los selectores y valores relevantes del archivo JSON
      const {
        urlInput,
        searchButton,
        messageElement,
        jsonViewer,
        rawJsonInput,
      } = pageData.selectors; // Selectores para interactuar con la UI
      const { name, id } = pageData.pokemon; // Datos del Pokémon (nombre e id)

      // Paso 1: Visitar la página de PokeAPI
      cy.visit("/");

      // Paso 2: Encontrar el campo de búsqueda y escribir el nombre del Pokémon
      // Se utiliza el selector del campo de entrada y se escribe el nombre del Pokémon
      cy.get(urlInput)
        .clear() // Limpiar el campo de entrada
        .type("pokemon/" + name); // Escribir el nombre del Pokémon a buscar

      // Paso 3: Hacer clic en el botón de búsqueda
      // Utilizamos el selector del botón de búsqueda y simulamos el clic
      cy.get(searchButton).click();

      // Paso 4: Verificar que el resultado contiene el nombre del Pokémon
      // Esperamos que el elemento que contiene el mensaje tenga el nombre del Pokémon
      cy.get(messageElement).should("include.text", name);

      // Paso 5: Hacer clic en 'View Raw JSON'
      // Esto nos permitirá ver el JSON crudo de la respuesta de la API
      cy.get(rawJsonInput).click();

      // Paso 6: Usar el comando personalizado para guardar el JSON del elemento
      // Esto guarda la respuesta en un alias para su posterior uso
      cy.guardarJsonDesdeElemento(jsonViewer, "jsonResponse");

      // Paso 7: Obtener el JSON guardado en el alias y realizar aserciones
      cy.get("@jsonResponse").then((jsonResponse) => {
        // Imprimir el JSON extraído para verificación en la consola
        cy.log("JSON Response:", jsonResponse);

        // Paso 8: Aserciones sobre el JSON extraído
        // Verificar que las propiedades 'name' y 'id' coincidan con los datos esperados
        expect(jsonResponse).to.have.property("name", name);
        expect(jsonResponse).to.have.property("id", id); // Suponiendo que el id de Pikachu es 25
      });

      // Paso 9: Realizar una llamada a la API para obtener datos adicionales
      cy.apiGet("pikachu");

      // Paso 10: Obtener la respuesta de la API y mostrar algunas propiedades
      cy.get("@pikachuData").then((data) => {
        // Imprimir las primeras dos habilidades y el peso del Pokémon
        cy.log("Primera habilidad: " + data.abilities[0].ability.name);
        cy.log("Segunda habilidad: " + data.abilities[1].ability.name);
        cy.log("Peso: " + data.weight + "kg");
      });

      // Paso 11: Comparar los JSONs obtenidos (de la API y la UI) utilizando los aliases
      // Llamamos al comando personalizado para hacer la comparación entre los dos JSONs
      cy.compararJsonPorAlias("pikachuData", "jsonResponse");
    });
  });
});
