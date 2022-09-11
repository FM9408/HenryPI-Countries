const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.STRING({length: 5}),
      allowNull: false,
      primaryKey: true
    },
    flag: {
      type: DataTypes.STRING,
      allowNull: true
    },
    capitol: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    subregion: {
      type: DataTypes.STRING,
      allowNull: true
    }, 
    area: {
      type: DataTypes.INTEGER({decimals: 1}),
      allowNull: false
    },
    population: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    continents: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    official: {
      type: DataTypes.STRING,
      allowNull: true
    },
    languages: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    }
  }, {
    timestamp: false,
    createdAt: false,
    updatedAt: false
  });
};
