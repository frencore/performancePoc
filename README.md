
# PerformancePoc

Este proyecto es una prueba de concepto para realizar pruebas de rendimiento en una API, además de pruebas end-to-end (E2E) en la interfaz de usuario (UI) de la aplicación. Se enfoca en la integración de pruebas con herramientas como Cypress para asegurar el rendimiento y la fiabilidad de la aplicación. En el futuro, se tiene la intención de incorporar **Gatling** para realizar pruebas de rendimiento más avanzadas.

## Descripción

El objetivo de este proyecto es evaluar el comportamiento de la aplicación en condiciones de alto rendimiento, verificando tanto la respuesta de las API como la interacción en la interfaz de usuario.

Se ha implementado una suite de pruebas automatizadas usando **Cypress**, que incluye tanto pruebas de API como de UI, para asegurar que el sistema pueda manejar diferentes situaciones y ofrecer un rendimiento óptimo.

**Futuro**: El proyecto tiene la intención de migrar las pruebas de rendimiento a **Gatling** para mejorar el análisis de rendimiento a gran escala.

## Tecnologías Utilizadas

- **Cypress**: Herramienta de testing de extremo a extremo (E2E) para pruebas automáticas de la UI y la API.
- **Node.js**: Entorno de ejecución para JavaScript.
- **Mocha**: Framework para realizar las pruebas.
- **Chai**: Librería de aserciones utilizada con Mocha.
- **Gatling** (próximamente): Herramienta para realizar pruebas de carga y rendimiento a gran escala.

## Requisitos

- Node.js (v14 o superior)
- NPM (o Yarn)

## Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/frencore/performancePoc.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd performancePoc
   ```

3. Instala las dependencias del proyecto:

   ```bash
   npm install
   ```

## Ejecución de Pruebas

1. **Pruebas de API**

   Para ejecutar las pruebas de la API, ejecuta el siguiente comando: 

   ```bash
   npx cypress open
   ```

   Esto abrirá la interfaz de Cypress donde podrás elegir ejecutar las pruebas de la API.

2. **Pruebas End-to-End (E2E)**

   Para ejecutar las pruebas E2E en la UI, sigue el mismo procedimiento que para las pruebas de API:

   ```bash
   npx cypress open
   ```

   Dentro de Cypress, selecciona el archivo `endToend.cy.js` para ejecutar las pruebas en la interfaz de usuario.

## Estructura del Proyecto

```
├── cypress/
│   ├── e2e/
│   │   ├── endToend.cy.js       # Archivo de pruebas end-to-end (UI)
│   │   └── apiTests.cy.js       # Archivo de pruebas de API
│   └── support/
│       ├── commands.js          # Definición de comandos personalizados de Cypress
│       ├── index.js             # Archivo principal de configuración de Cypress
├── package.json                 # Dependencias y scripts del proyecto
└── README.md                    # Este archivo de documentación
```

### Archivos principales:

- **cypress/e2e/endToend.cy.js**  
  Este archivo contiene las pruebas E2E que se ejecutan en la interfaz de usuario. Actualmente, se realizan pruebas para la búsqueda de un Pokémon en la PokeAPI.

- **cypress/e2e/apiTests.cy.js**  
  Aquí se encuentran las pruebas de rendimiento en la API. A futuro, se implementarán pruebas más detalladas con Gatling.

- **cypress/support/commands.js**  
  Aquí se encuentran los comandos personalizados de Cypress, incluyendo el comando `guardarJsonDesdeElemento`, que guarda un JSON desde un elemento en la página web.

- **cypress/support/index.js**  
  Archivo de configuración donde se cargan los comandos y configuraciones globales de Cypress.

## Contribuciones

Las contribuciones son bienvenidas. Si tienes alguna idea para mejorar el proyecto o encuentras un problema, por favor, abre un **Issue** o envía una **Pull Request**.

