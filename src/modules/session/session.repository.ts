import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SessionRepository {
  constructor(
    @InjectModel('Session') private sessionModel: Model<any>,
    @InjectModel('Event') private eventModel: Model<any>,
  ) {}

  async upsertSession(data: any) {
    return this.sessionModel.findOneAndUpdate(
      { sessionId: data.sessionId },
      { $setOnInsert: data },
      { upsert: true, new: true },
    );
  }

  async findSession(sessionId: string) {
    return this.sessionModel.findOne({ sessionId });
  }

  async completeSession(sessionId: string) {
    return this.sessionModel.findOneAndUpdate(
      { sessionId, status: { $ne: 'completed' } },
      { status: 'completed', endedAt: new Date() },
      { new: true },
    );
  }

  async addEvent(event: any) {
    return this.eventModel.create(event);
  }

  async getEvents(sessionId: string, limit: number, offset: number) {
    return this.eventModel
      .find({ sessionId })
      .sort({ timestamp: 1 })
      .skip(offset)
      .limit(limit);
  }
}