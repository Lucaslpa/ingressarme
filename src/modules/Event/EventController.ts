import {
  Body,
  Controller,
  Delete,
  HttpException,
  Param,
  Post,
  Put,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import {
  UserInput,
  IUserModifier,
  Response,
  UserOutput,
  UpdateEventInput,
  IUpdateEvent,
} from '@application';
import { HttpResponseInterceptor } from '../../utils/HttpResponseInterceptor';
import { IsAuthenticatedInterceptor } from '../../utils/IsAuthenticatedInterceptor';
import { CreateEventInput, ICreateEvent } from '@application';
import { IExcludeEvent, ExludeEventInput } from '@application';

@UseInterceptors(HttpResponseInterceptor)
@Controller('event')
export class EventController {
  constructor(
    private readonly exludeEvent: IExcludeEvent,
    private readonly createEvent: ICreateEvent,
    private readonly updateEvent: IUpdateEvent,
  ) {}

  @Post()
  async create(@Body() input: CreateEventInput) {
    const response = await this.createEvent.execute(input);
    return response;
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Body() input: ExludeEventInput) {
    if (input.eventId !== id) {
      return new Response<{ eventId: string }>(false, null, [
        'Id from body is different from id from params',
      ]);
    }

    const response = await this.exludeEvent.execute({
      userId: input.userId,
      eventId: id,
    });
    return response;
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() input: UpdateEventInput) {
    if (input.eventId !== id) {
      return new Response<{ eventId: string }>(false, null, [
        'eventId from body is different from eventId from params',
      ]);
    }

    const response = await this.updateEvent.execute(input);
    return response;
  }
}
