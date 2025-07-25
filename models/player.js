'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Player.belongsToMany(models.Team, {
        through: 'TeamPlayers',
        foreignKey: 'playerId',
        otherKey: 'teamId',
        as: 'teams',
      });
    }
  }
  Player.init({
    name: DataTypes.STRING,
    role: DataTypes.STRING,
    cost: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};
