import mongoose, { Document, Schema } from 'mongoose';

export interface Fish extends Document {
  name: string;
  rarity: string;
  speed: number;
  hungerRate: number;
  happiness: number;
  sprite: string;
}

const fishSchema = new Schema({
  name: { type: String, required: true },
  rarity: { type: String, required: true },
  speed: { type: Number, required: true },
  hungerRate: { type: Number, required: true },
  happiness: { type: Number, required: true },
  sprite: { type: String, required: true }
});

export default mongoose.model<Fish>('Fish', fishSchema);