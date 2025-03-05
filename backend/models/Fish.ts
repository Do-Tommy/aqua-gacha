import mongoose, { Document, Schema } from 'mongoose';

export interface Fish extends Document {
  id: string;
  name: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  speed: number;
  hungerRate: number;
  happiness: number;
  sprite: string;
}

const fishSchema: Schema<Fish> = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  rarity: { type: String, enum: ['Common', 'Rare', 'Epic', 'Legendary'], required: true },
  speed: { type: Number, required: true },
  hungerRate: { type: Number, required: true },
  happiness: { type: Number, required: true, min: 0, max: 100 },
  sprite: { type: String, required: true },
});

export default mongoose.model<Fish>('Fish', fishSchema);