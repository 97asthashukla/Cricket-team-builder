const express = require('express');
const router = express.Router();
const {
  createTeam,
  updateTeam,
  getTeam,
  getAllTeams,
} = require('../controllers/teamController');
const authMiddleware = require('../middlewares/auth');

router.post('/', authMiddleware, createTeam);
router.put('/:id', authMiddleware, updateTeam);
router.get('/:id', authMiddleware, getTeam);
router.get('/', authMiddleware, getAllTeams);

module.exports = router;
