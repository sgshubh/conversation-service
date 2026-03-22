import { Schema } from 'mongoose';

export const EventSchema = new Schema({
  eventId: { type: String, required: true },
  sessionId: { type: String, required: true },
  type: { type: String, enum: ['user_speech', 'bot_speech', 'system'] },
  payload: { type: Object },
  timestamp: { type: Date, default: Date.now },
});

// Prevent duplicates
EventSchema.index({ sessionId: 1, eventId: 1 }, { unique: true });

// For sorting
EventSchema.index({ sessionId: 1, timestamp: 1 });

