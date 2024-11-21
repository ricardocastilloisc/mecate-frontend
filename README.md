
# MecateFrontend



Este proyecto requiere que se configure una variable de entorno para el dominio personal utilizado en las API. Sigue los pasos a continuación para configurar correctamente el entorno.

## Configuración de la variable de entorno

### En Windows o Linux

1. **Configura la variable de entorno** `dominio_personal` con el valor de tu dominio:
   - **Windows**: 
     - Abre la terminal y ejecuta:
       ```bash
       set dominio_personal=http://dominio_personal
       ```
   - **Linux**: 
     - Abre la terminal y ejecuta:
       ```bash
       export dominio_personal=http://dominio_personal
       ```

2. **Ejecuta el archivo de configuración** para establecer la variable de entorno:
   - Usa el siguiente comando:
     ```bash
     node set-env.js
     ```
     O si usas npm:
     ```bash
     npm run config
     ```

### Explicación

El archivo `set-env.js` establecerá automáticamente la variable de entorno para que pueda ser utilizada en la aplicación sin necesidad de modificar el código fuente. Es recomendable ejecutar este paso antes de iniciar el proyecto.

---


### Documentation

#### Generating Documentation with Compodoc

To generate the documentation for this project using Compodoc, follow these steps:

1. Ensure you have installed all necessary packages, including Compodoc. If you haven't installed Compodoc, you can do it by running:
   ```bash
   npm install --save-dev @compodoc/compodoc
   ```

2. Run the following command to generate the documentation:
   ```bash
   npm run compodoc
   ```

   This will create the documentation in the `documentation` folder (or the specified output folder) of your project.

#### Viewing Documentation

To view the generated documentation, you can start a local server with Compodoc:

1. After generating the documentation, run the following command:
   ```bash
   npx compodoc -s
   ```

2. Open your web browser and navigate to [http://localhost:8080](http://localhost:8080) to see the documentation.

# Project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
