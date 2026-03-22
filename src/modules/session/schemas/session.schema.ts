import { Schema } from 'mongoose';

export const SessionSchema = new Schema({
  sessionId: { type: String, required: true, unique: true },
  status: { type: String, enum: ['initiated', 'active', 'completed', 'failed'], default: 'initiated' },
  language: { type: String },
  startedAt: { type: Date, default: Date.now },
  endedAt: { type: Date, default: null },
  metadata: { type: Object },
});