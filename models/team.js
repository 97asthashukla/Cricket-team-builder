'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Team.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
      Team.belongsToMany(models.Player, {
        through: 'TeamPlayers',
        foreignKey: 'teamId',
        otherKey: 'playerId',
        as: 'players',
    });
    }
  }
  Team.init({
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};
