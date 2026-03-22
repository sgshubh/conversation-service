import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { SessionRepository } from './session.repository';
import { SessionSchema } from './schemas/session.schema';
import { EventSchema } from './schemas/event.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Session', schema: SessionSchema },
      { name: 'Event', schema: EventSchema },
    ]),
  ],
  controllers: [SessionController],
  providers: [SessionService, SessionRepository],
})
export class SessionModule {}