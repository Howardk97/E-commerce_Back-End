// Bring in sequelize
const { Model, DataTypes } = require('sequelize');

// connect to sequelize
const sequelize = require('../config/connection.js');

// Create Tag Model
class Tag extends Model {}

// Specify what inputs can be in Tag table
Tag.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    tag_name: {
      type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
