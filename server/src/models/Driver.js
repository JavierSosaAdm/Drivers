const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('driver', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false
    },

    nationality: {
      type: DataTypes.STRING,
      allowNull: false
    },

    birthdate: {
      type: DataTypes.STRING,
      allowNull: false
    },

    created: {
      type: DataTypes.BOOLEAN(true, false),
    }

  }, {timestamps: false});
};