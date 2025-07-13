const express = require('express');
const router = express.Router();
const { createPlayer, getAllPlayers } = require('../controllers/playerController');
const authMiddleware = require('../middlewares/auth');

router.post('/', authMiddleware, createPlayer);
router.get('/', authMiddleware, getAllPlayers);

module.exports = router;
