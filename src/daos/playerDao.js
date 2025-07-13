const { Player } = require('../../models');

const createPlayer = async (playerData) => {
  const { name, role, cost } = playerData;
  return await Player.create({ name, role, cost });
};

const getAllPlayers = async () => {
  return await Player.findAll();
};

const findPlayersByIds = async (playerIds) => {
  return await Player.findAll({ where: { id: playerIds } });
};

module.exports = {
  createPlayer,
  getAllPlayers,
  findPlayersByIds,
};
