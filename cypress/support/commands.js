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
Cypress.Commands.add("apiGet", (endpoint) => {
  const aliasName = `${endpoint}Data`; // Genera un alias dinámico basado en el endpoint

  cy.request("GET", `${Cypress.env("urlApi")}/${endpoint}`).then((response) => {
    expect(response.status).to.equal(200);
    //cy.log(JSON.stringify(response.body, null, 2)); // Imprime la respuesta JSON
    cy.wrap(response.body).as(aliasName); // Guarda la respuesta con alias dinámico
  });
});

/**
 * Comando personalizado para extraer el JSON de un elemento HTML y guardarlo en un alias.
 *
 * @param {string} selector - El selector CSS del elemento que contiene el JSON.
 * @param {string} aliasName - El nombre del alias en el que se guardará el JSON extraído.
 */
Cypress.Commands.add("guardarJsonDesdeElemento", (selector, aliasName) => {
  // Validación de parámetros
  if (!selector || !aliasName) {
    throw new Error("Debe proporcionar un selector y un nombre de alias.");
  }

  cy.get(selector) // Encuentra el elemento utilizando el selector proporcionado
    .invoke("text") // Extrae el texto (JSON en formato string) del elemento
    .then((jsonTexto) => {
      try {
        // Intenta parsear el texto como JSON
        const jsonObj = JSON.parse(jsonTexto);

        // Guarda el JSON parseado en el alias especificado
        cy.wrap(jsonObj).as(aliasName);
      } catch (error) {
        console.error("Error al parsear el JSON: ", error);
        throw new Error("El contenido extraído no es un JSON válido.");
      }
    });
});
/**
 * Compara los datos de un JSON obtenido de la API con un JSON extraído de la UI.
 *
 * Este comando permite comparar los datos de la API y de la UI (guardados en aliases)
 * asegurando que las propiedades clave coincidan entre ambos JSONs.
 *
 * @param {string} apiAlias - El alias de la respuesta de la API.
 * @param {string} uiAlias - El alias del JSON extraído de la UI.
 *
 * @example
 *
 * En una prueba, puedes usar este comando de la siguiente manera:
 * cy.compararJsonPorAlias('apiResponse', 'jsonResponse');
 *
 * Esto comparará los datos del alias 'apiResponse' (respuesta de la API)
 * con los datos del alias 'jsonResponse' (JSON extraído de la UI).
 */
Cypress.Commands.add("compararJsonPorAlias", (apiAlias, uiAlias) => {
  // Usamos los aliases proporcionados para obtener los JSONs guardados
  cy.get(`@${apiAlias}`).then((apiResponse) => {
    const apiData = apiResponse; // Datos de la API

    cy.get(`@${uiAlias}`).then((uiJson) => {
      // Paso 1: Comparar los datos de la API con los de la UI
      // Aseguramos que el 'name' y 'id' coincidan entre el JSON de la API y el JSON de la UI
      expect(apiData.name).to.eq(uiJson.name);
      expect(apiData.id).to.eq(uiJson.id);

      // Aquí puedes agregar más comparaciones según las propiedades que quieras verificar
      // Ejemplo:
      // Comparación de otros campos importantes, como 'height' y 'base_experience'
      expect(apiData.height).to.eq(uiJson.height);
      expect(apiData.base_experience).to.eq(uiJson.base_experience);

      // Paso 2: Comparación de arrays o listas (habilidades, artículos, etc.)
      // Comparar 'abilities'
      apiData.abilities.forEach((ability, index) => {
        expect(ability.ability.name).to.eq(
          uiJson.abilities[index].ability.name
        );
        expect(ability.is_hidden).to.eq(uiJson.abilities[index].is_hidden);
      });

      // Comparar 'held_items'
      apiData.held_items.forEach((item, index) => {
        expect(item.item.name).to.eq(uiJson.held_items[index].item.name);
        expect(item.version_details.length).to.eq(
          uiJson.held_items[index].version_details.length
        );
      });
      //Comparación del JSON completo
      expect(apiData).to.deep.equal(uiJson);
    });
  });
});
/**
 * Agrega un comando personalizado que simula una respuesta de la API de PokeAPI para Pikachu.
 *
 * Este comando intercepta las solicitudes GET a la API de PokeAPI para el Pokémon Pikachu y devuelve 
 * un JSON mockeado con datos simulados. Además, permite personalizar el código de respuesta HTTP 
 * (por defecto es 200). Esto facilita la prueba de cómo la UI maneja diferentes códigos de estado HTTP.
 *
 * @param {number} statusCode - El código de respuesta HTTP que se simulará. El valor predeterminado es 200.
 * @example
 *
 * En una prueba, puedes usar este comando de la siguiente manera:
 *
 * // Usar el código de respuesta 200 (éxito) por defecto
 * cy.mockPikachu();
 *
 * // Usar un código de respuesta 404 para simular un error de no encontrado
 * cy.mockPikachu(404);
 *
 * Esto interceptará la solicitud GET a la API de PokeAPI para Pikachu y devolverá un JSON mockeado 
 * con los datos del Pokémon, o una respuesta simulada con el código de estado HTTP especificado.
 */
Cypress.Commands.add('mockPikachu', (statusCode = 200) => {
  cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/pikachu', {
    statusCode: statusCode, // Usamos el código de respuesta HTTP proporcionado (por defecto 200)
    body: {
      name: 'pikachu', // Nombre del Pokémon
      id: 25, // ID en la Pokédex
      base_experience: 112, // Experiencia base del Pokémon
      height: 4, // Altura en decímetros
      weight: 60, // Peso en hectogramos
      abilities: [
        {
          ability: { 
            name: 'static', // Habilidad principal
            url: 'https://pokeapi.co/api/v2/ability/9/' // URL de la habilidad
          },
          is_hidden: false, // Habilidad no oculta
          slot: 1, // Prioridad de la habilidad
        },
        {
          ability: { 
            name: 'lightning-rod', // Habilidad secundaria
            url: 'https://pokeapi.co/api/v2/ability/31/' // URL de la habilidad
          },
          is_hidden: true, // Habilidad oculta
          slot: 3, // Prioridad de la habilidad
        },
      ],
      sprites: {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png', // Imagen frontal
      },
      types: [
        {
          slot: 1, // Tipo principal
          type: { 
            name: 'electric', // Tipo eléctrico
            url: 'https://pokeapi.co/api/v2/type/13/' // URL del tipo eléctrico
          },
        },
      ],
    },
  }).as('getPikachu'); // Alias para esperar la interceptación en las pruebas
});
