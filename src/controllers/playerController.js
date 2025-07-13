const { playerService } = require('../services');

const createPlayer = async (req, res) => {
  try {
    const { name, role, cost } = req.body;
    const player = await playerService.createPlayer({ name, role, cost });
    res.status(201).json({ message: 'Player created successfully', player });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllPlayers = async (req, res) => {
  try {
    const players = await playerService.getAllPlayers();
    res.json({ players });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPlayer,
  getAllPlayers,
};
