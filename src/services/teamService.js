const { teamDao } = require('../daos');
const { findPlayersByIds } = require('./playerService'); // Import from playerService
const { validateTeam } = require('./teamValidation');
const { TEAM_MESSAGES } = require('../constants/messages');

const createTeam = async (name, playerIds, userId) => {
  const players = await findPlayersByIds(playerIds); // Call playerService function
  if (players.length !== playerIds.length) {
    throw new Error(TEAM_MESSAGES.PLAYERS_NOT_FOUND);
  }

  const validation = validateTeam(players);
  if (!validation.valid) {
    throw new Error(validation.message);
  }

  return await teamDao.createTeam({ name, userId }, players);
};

const updateTeam = async (teamId, name, playerIds, userId) => {
  const players = await findPlayersByIds(playerIds); // Call playerService function
  if (players.length !== playerIds.length) {
    throw new Error(TEAM_MESSAGES.PLAYERS_NOT_FOUND);
  }

  const validation = validateTeam(players);
  if (!validation.valid) {
    throw new Error(validation.message);
  }

  return await teamDao.updateTeam(teamId, userId, name, players);
};

const getTeam = async (teamId, userId) => {
  const team = await teamDao.findTeamById(teamId, userId);
  if (!team) {
    throw new Error(TEAM_MESSAGES.TEAM_NOT_FOUND);
  }
  return team;
};

const getAllTeams = async (userId) => {
  return await teamDao.findAllTeamsByUserId(userId);
};

module.exports = {
  createTeam,
  updateTeam,
  getTeam,
  getAllTeams,
};
