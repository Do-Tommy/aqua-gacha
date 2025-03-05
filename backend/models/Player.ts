import mongoose, { Document, Schema } from 'mongoose';
import { Fish } from './Fish'; // Import both model and interface

export interface Player extends Document {
  userId: string;
  username: string;
  fish: Fish[];
  gems: number;
}

const playerSchema: Schema<Player> = new Schema({
  userId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  fish: [{ type: Schema.Types.ObjectId, ref: 'Fish' }], // Reference Fish model
  gems: { type: Number, default: 0 },
});

export default mongoose.model<Player>('Player', playerSchema);