const { playerDao } = require('../daos');

const createPlayer = async (playerData) => {
  return await playerDao.createPlayer(playerData);
};

const getAllPlayers = async () => {
  return await playerDao.getAllPlayers();
};

const findPlayersByIds = async (playerIds) => {
  return await playerDao.findPlayersByIds(playerIds);
};

module.exports = {
  createPlayer,
  getAllPlayers,
  findPlayersByIds,
};
