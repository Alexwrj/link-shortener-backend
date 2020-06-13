'use strict';

module.exports = {
  up: (Sequelize, DataTypes) => 
    Sequelize.createTable('ls_links', {
      'id': {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      'origin': {
        type: DataTypes.STRING(1024),
        allowNull: false,
      },
      'shorten': {
        type: DataTypes.STRING(128),
        defaultValue: '',
      }
    }),

  down: (Sequelize) => Sequelize.dropTable('ls_links'),
};
