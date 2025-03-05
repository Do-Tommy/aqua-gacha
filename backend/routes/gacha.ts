import express, { Request, Response } from 'express';
import Player from '../models/Player';

const router = express.Router();

router.post('/pull', async (req: Request, res: Response) => {
  const { userId } = req.body;
  const player = await Player.findOne({ userId });

  if (!player || player.gems < 10) {
    return res.status(400).json({ error: 'Not enough gems' });
  }

  const fishPool = [
    { name: 'Goldfish', rarity: 'Common', speed: 40, hungerRate: 6, happiness: 50, sprite: 'goldfish.png', chance: 0.5 },
    { name: 'Betta', rarity: 'Rare', speed: 70, hungerRate: 8, happiness: 70, sprite: 'betta.png', chance: 0.3 },
    { name: 'Angelfish', rarity: 'Epic', speed: 50, hungerRate: 10, happiness: 80, sprite: 'angelfish.png', chance: 0.15 },
    { name: 'Dragonfish', rarity: 'Legendary', speed: 90, hungerRate: 12, happiness: 90, sprite: 'dragonfish.png', chance: 0.05 },
  ];

  const roll = Math.random();
  let fishData;
  let cumulativeChance = 0;
  for (const fish of fishPool) {
    cumulativeChance += fish.chance;
    if (roll <= cumulativeChance) {
      fishData = fish;
      break;
    }
  }

  const newFish = {
    id: `fish-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    ...fishData,
  };

  player.fish.push(newFish);
  player.gems -= 10;
  await player.save();

  res.json(newFish);
});

export default router;