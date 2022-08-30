const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    launchDate:{
      type: DataTypes.STRING,
    },
    rating:{
      type: DataTypes.FLOAT,
    },
    platform:{
      type: DataTypes.STRING
    },
    src:{
      type: DataTypes.TEXT
    }
  });
};
