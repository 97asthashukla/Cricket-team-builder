const { teamService } = require('../services');

const createTeam = async (req, res) => {
  try {
    const { name, players: playerIds } = req.body;
    const { userId } = req.user;
    const team = await teamService.createTeam(name, playerIds, userId);
    res.status(201).json(team);
  } catch (error) {
    if (
      error.message === 'One or more players not found.' ||
      !error.message.includes('validation')
    ) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

const updateTeam = async (req, res) => {
  try {
    const { name, players: playerIds } = req.body;
    const { userId } = req.user;
    const { id } = req.params;
    const team = await teamService.updateTeam(id, name, playerIds, userId);
    res.json(team);
  } catch (error) {
    if (error.message === 'Team not found') {
      return res.status(404).json({ error: error.message });
    }
    if (
      error.message === 'One or more players not found.' ||
      !error.message.includes('validation')
    ) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

const getTeam = async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;
    const team = await teamService.getTeam(id, userId);
    res.json({ team });
  } catch (error) {
    if (error.message === 'Team not found') {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.status(500).json({ error: error.message });
  }
};

const getAllTeams = async (req, res) => {
  try {
    const { userId } = req.user;
    const teams = await teamService.getAllTeams(userId);
    res.json({ teams });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTeam,
  updateTeam,
  getTeam,
  getAllTeams,
};
