const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  // ID *
  //   Nombre *
  //   Altura *
  //   Peso *
  //   Años de vida
  sequelize.define('Dog', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height_max: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height_min: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    weight_max: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight_min: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    life_span: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'https://i.guim.co.uk/img/media/684c9d087dab923db1ce4057903f03293b07deac/205_132_1915_1150/master/1915.jpg?width=940&quality=45&auto=format&fit=max&dpr=2&s=7e721515d367091c62d877ebd2529731'
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }

  },
  
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false
  });
};