const { Team, Player } = require('../../models');

const createTeam = async (teamData, players) => {
  const { name, userId } = teamData;
  const team = await Team.create({ name, userId });
  await team.addPlayers(players);
  return team;
};

const findTeamById = async (id, userId) => {
  return await Team.findOne({
    where: { id, userId },
    include: [{ model: Player, as: 'players', through: { attributes: [] } }],
  });
};

const findAllTeamsByUserId = async (userId) => {
  return await Team.findAll({
    where: { userId },
    include: [{ model: Player, as: 'players', through: { attributes: [] } }],
  });
};

const updateTeam = async (id, userId, name, players) => {
  const team = await Team.findOne({ where: { id, userId } });
  if (!team) {
    throw new Error('Team not found');
  }
  await team.update({ name });
  await team.setPlayers(players);
  return team;
};

module.exports = {
  createTeam,
  findTeamById,
  findAllTeamsByUserId,
  updateTeam,
};
