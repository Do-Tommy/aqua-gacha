import { Request, Response, Router } from 'express';
import Player from '../models/Player';
import FishModel from '../models/Fish';

interface FishData {
  name: string;
  rarity: string;
  speed: number;
  hungerRate: number;
  happiness: number;
  sprite: string;
  chance: number;
}

const router = Router();

const pullHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.body as { userId: string };
    const player = await Player.findOne({ userId });

    if (!player || player.gems < 10) {
      res.status(400).json({ error: 'Not enough gems' });
      return;
    }

    const fishPool: FishData[] = [
      { name: 'Goldfish', rarity: 'Common', speed: 40, hungerRate: 6, happiness: 50, sprite: 'goldfish.png', chance: 0.5 },
      { name: 'Betta', rarity: 'Rare', speed: 70, hungerRate: 8, happiness: 70, sprite: 'betta.png', chance: 0.3 },
      { name: 'Angelfish', rarity: 'Epic', speed: 50, hungerRate: 10, happiness: 80, sprite: 'angelfish.png', chance: 0.15 },
      { name: 'Dragonfish', rarity: 'Legendary', speed: 90, hungerRate: 12, happiness: 90, sprite: 'dragonfish.png', chance: 0.05 },
    ];

    const roll = Math.random();
    let fishData: FishData | undefined;
    let cumulativeChance = 0;
    for (const fish of fishPool) {
      cumulativeChance += fish.chance;
      if (roll <= cumulativeChance) {
        fishData = fish;
        break;
      }
    }

    if (!fishData) {
      fishData = fishPool[0]; // Default to first fish if something went wrong
    }

    const newFish = new FishModel({
      name: fishData.name,
      rarity: fishData.rarity,
      speed: fishData.speed,
      hungerRate: fishData.hungerRate,
      happiness: fishData.happiness,
      sprite: fishData.sprite
    });

    player.fish.push(newFish);
    player.gems -= 10;
    await player.save();

    res.json(newFish);
  } catch (error) {
    console.error('Error processing pull request:', error); // Log the error for debugging
    res.status(500).json({ error: 'Server error' });
  }
};

router.post('/pull', pullHandler);

export default router;