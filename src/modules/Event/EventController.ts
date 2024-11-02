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
  Response,
  UpdateEventInput,
  IUpdateEvent,
  CategoryModifierInput,
  ICategoryModifier,
  ITicketModifier,
  CreateTicketInput,
  UpdateTicketInput,
  RemoveTicketInput,
} from '@application';
import { HttpResponseInterceptor } from '../../utils/HttpResponseInterceptor';
import { CreateEventInput, ICreateEvent } from '@application';
import { IExcludeEvent, ExludeEventInput } from '@application';

@UseInterceptors(HttpResponseInterceptor)
@Controller('event')
export class EventController {
  constructor(
    private readonly exludeEvent: IExcludeEvent,
    private readonly createEvent: ICreateEvent,
    private readonly updateEvent: IUpdateEvent,
    private readonly categoryModifier: ICategoryModifier,
    private readonly ticketModifier: ITicketModifier,
  ) {}

  @Post()
  async create(@Body() input: CreateEventInput) {
    const response = await this.createEvent.execute(input);
    return response;
  }

  @Post('/category')
  async addCategory(@Body() input: CategoryModifierInput) {
    const response = await this.categoryModifier.add(input);
    return response;
  }

  @Delete('/category')
  async removeCategory(@Body() input: CategoryModifierInput) {
    console.log('input', input);
    const response = await this.categoryModifier.remove(input);
    return response;
  }

  @Post('/ticket')
  async addTicket(@Body() input: CreateTicketInput) {
    const response = await this.ticketModifier.add(input);
    return response;
  }

  @Put('/ticket')
  async updateTicket(@Body() input: UpdateTicketInput) {
    const response = await this.ticketModifier.update(input);
    return response;
  }

  @Delete('/ticket')
  async removeTicket(@Body() input: RemoveTicketInput) {
    const response = await this.ticketModifier.remove(input);
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

  @Delete(':id')
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
}
