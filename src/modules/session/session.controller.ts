import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { SessionService } from './session.service';

@Controller('sessions')
export class SessionController {
  constructor(private service: SessionService) {}

  @Post()
  create(@Body() dto: any) {
    return this.service.createOrGetSession(dto);
  }

  @Post(':sessionId/events')
  addEvent(@Param('sessionId') sessionId: string, @Body() dto: any) {
    return this.service.addEvent(sessionId, dto);
  }

  @Get(':sessionId')
  getSession(
    @Param('sessionId') sessionId: string,
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
  ) {
    return this.service.getSession(sessionId, Number(limit), Number(offset));
  }

  @Post(':sessionId/complete')
  complete(@Param('sessionId') sessionId: string) {
    return this.service.completeSession(sessionId);
  }
}