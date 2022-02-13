const { writeFile } = require('fs');
const { argv } = require('yargs');
require('dotenv').config();

const environment = argv.environment;
const isProduction = environment === 'prod';
const targetPath = isProduction
    ? `./src/environments/environment.prod.ts`
    : `./src/environments/environment.ts`;

const environmentFileContent = `
export const environment = {
   production: ${isProduction},
   apiUrl: '${process.env.API_URL}',
   debug: ${process.env.DEBUG || false},
   appIdFacebook: '${process.env.APP_ID_FACEBOOK}',
   appSecretFacebook: '${process.env.APP_SECRET_FACEBOOK}',
   googleClientId: ''
};`;

writeFile(targetPath, environmentFileContent, function (err) {
    if (err) {
        console.log(err);
    }
    console.log(`Variáveis de ambiente trocadas no arquivo ${targetPath}!`);
    return true;
});