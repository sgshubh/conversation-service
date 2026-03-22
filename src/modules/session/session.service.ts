import { Injectable, NotFoundException } from '@nestjs/common';
import { SessionRepository } from './session.repository';

@Injectable()
export class SessionService {
  constructor(private repo: SessionRepository) {}

  async createOrGetSession(dto: any) {
    return this.repo.upsertSession({
      sessionId: dto.sessionId,
      language: dto.language,
      metadata: dto.metadata,
      status: 'initiated',
      startedAt: new Date(),
    });
  }

  async addEvent(sessionId: string, dto: any) {
    const session = await this.repo.findSession(sessionId);
    if (!session) throw new NotFoundException('Session not found');

    try {
      return await this.repo.addEvent({
        sessionId,
        eventId: dto.eventId,
        type: dto.type,
        payload: dto.payload,
        timestamp: dto.timestamp || new Date(),
      });
    } catch (err: any) {
      if (err.code === 11000) {
        return { message: 'Duplicate event ignored' };
      }
      throw err;
    }
  }

  async getSession(sessionId: string, limit = 10, offset = 0) {
    const session = await this.repo.findSession(sessionId);
    if (!session) throw new NotFoundException('Session not found');

    const events = await this.repo.getEvents(sessionId, limit, offset);
    return { session, events };
  }

  async completeSession(sessionId: string) {
    const session = await this.repo.completeSession(sessionId);
    if (!session) return { message: 'Already completed or not found' };
    return session;
  }
}