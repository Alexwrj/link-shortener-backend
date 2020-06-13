const { Sequelize, DataTypes } = require("sequelize");

module.exports = (Sequelize, DataTypes) => {
  const Link = Sequelize.define('Link', {
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
    },
  }, {
    tableName: 'ls_links',
    timestamps: false,
  });

  return Link;
};