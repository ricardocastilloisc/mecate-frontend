const fs = require('fs');
const path = require('path');



require('dotenv').config();

console.log(process.env)
const dominioPersonal = process.env.dominio_personal;


// Crea el objeto con la URL general usando el dominio
/*
const environment = {
  dominioPersonal: `https://${dominio}`
};*/
const environment = {
  dominioPersonal: dominioPersonal
};

console.log(environment);

// Convierte el objeto a una cadena de texto en formato JSON
const environmentString = `export const environment = ${JSON.stringify(environment)};`;



fs.unlink('./src/environments/environment.prod.ts', (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Archivo eliminado correctamente');
});


fs.unlink('./src/environments/environment.ts', (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Archivo eliminado correctamente');
});


fs.writeFile('./src/environments/environment.prod.ts', environmentString, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(`Angular environment.ts file generated`);
  }
});
fs.writeFile('./src/environments/environment.ts', environmentString, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(`Angular environment.ts file generated`);
  }
});

