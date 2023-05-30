// configurar ORM sequelize
const { Sequelize, DataTypes } = require("sequelize");
//const sequelize = new Sequelize("sqlite:" + process.env.base );
const sequelize = new Sequelize("sqlite:" + "./.data/pymes.db");

// definicion del modelo de datos
const peliculas = sequelize.define(
  "peliculas",
  {
    IdPelicula: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      // todo evitar que string autocomplete con espacios en blanco, deberia ser varchar sin espacios
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [0, 30],
          msg: "Nombre debe ser tipo carateres, entre 0 y 30 de longitud",
        },
      },
    },
    FechaEstreno: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true,
          isBefore: new Date().toISOString().split("T")[0],
        },
      },
  },
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (peliculas, options) {
        if (typeof peliculas.Nombre === "string") {
            peliculas.Nombre = peliculas.Nombre.toUpperCase().trim();
        }
      },
    },

    timestamps: false,
  }
);

module.exports = {
    sequelize,
    peliculas
  };
  
