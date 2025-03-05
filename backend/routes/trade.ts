import express, { Request, Response } from 'express';
import Player from '../models/Player';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const { senderId, receiverId, senderFishId, receiverFishId } = req.body;

  const sender = await Player.findOne({ userId: senderId });
  const receiver = await Player.findOne({ userId: receiverId });

  if (!sender || !receiver || sender.fish.length <= 1 || receiver.fish.length <= 1) {
    return res.status(400).json({ error: 'Invalid trade or not enough fish' });
  }

  const senderFish = sender.fish.find(f => f.id === senderFishId);
  const receiverFish = receiver.fish.find(f => f.id === receiverFishId);

  if (!senderFish || !receiverFish) {
    return res.status(400).json({ error: 'Fish not found' });
  }

  sender.fish = sender.fish.filter(f => f.id !== senderFishId);
  receiver.fish = receiver.fish.filter(f => f.id !== receiverFishId);
  sender.fish.push(receiverFish);
  receiver.fish.push(senderFish);

  await sender.save();
  await receiver.save();

  res.json({ success: true });
});

export default router;