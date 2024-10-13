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
import { UserInput, IUserModifier, Response, UserOutput } from '@application';
import { HttpResponseInterceptor } from '../../utils/HttpResponseInterceptor';
import { IsAuthenticatedInterceptor } from '../../utils/IsAuthenticatedInterceptor';
import { CreateEventInput } from 'src/application/dto/CreateEventInput';
import { ICreateEvent } from 'src/application/interfaces/ICreateEvent';

@UseInterceptors(HttpResponseInterceptor)
@Controller('EventController')
export class EventController {
  constructor(private readonly createEvent: ICreateEvent) {}

  @Post('/event/create')
  async create(@Body() input: CreateEventInput) {
    const response = await this.createEvent.execute(input);
    return response;
  }
}
