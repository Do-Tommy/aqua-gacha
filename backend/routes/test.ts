import express from 'express';
import Player from '../models/Player';

const router = express.Router();

router.post('/player', async (req, res) => {
  try {
    const newPlayer = new Player({
      userId: '123test',
      username: 'TestUser',
      gems: 100
    });
    await newPlayer.save();
    res.json(newPlayer);
  } catch (error) {
    console.error('Error creating player:', error);
    res.status(500).json({ error: 'Failed to create player' });
  }
});

router.get('/players', async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (error) {
    console.error('Error fetching players:', error);
    res.status(500).json({ error: 'Failed to fetch players' });
  }
});

export default router;
