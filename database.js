const Sequelize = require('sequelize');
const path = require('path');
const klawSync = require('klaw-sync');
const dotenv = require('dotenv');
dotenv.config();

const connectionString = process.env.MAIN_DATABASE;

console.log('Connection string: ', connectionString);

const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
    dialectOptions: {
        multipleStatements: true,
    },
});

const models = {};

const modelsPaths = klawSync(`${__dirname}/models`, { nodir: true });

modelsPaths.forEach((file) => {
  if (!require(path.resolve(__dirname, file.path))) return;
  console.log('File: ', path.resolve(__dirname, file.path));
  let model = sequelize.import(path.resolve(__dirname, file.path));
  models[model.name] = model;
});

Object.keys(models).forEach((name) => {
  if ('associate' in models[name]) {
    models[name].associate(models)
  }
});

module.exports = { sequelize, models };
