import { Module, Scope } from '@nestjs/common';

import {
  UserValidator,
  IModelValidator,
  IServices,
  Notifications,
  MEvent,
  EventValidator,
} from '@business';
import { CreateEvent, IUserModifier, UserModifier } from '@application';

import { ITokenIsValid, UserServices, TokenIsValid } from '@infra';
import { EventController } from './EventController';
import { ICreateEvent } from 'src/application/interfaces/ICreateEvent';

@Module({
  controllers: [EventController],
  providers: [
    {
      provide: Notifications,
      useClass: Notifications,
      scope: Scope.REQUEST,
    },
    {
      provide: ITokenIsValid,
      useValue: TokenIsValid,
    },
    {
      provide: IModelValidator,
      useClass: UserValidator,
    },
    {
      provide: IServices,
      useClass: UserServices,
    },
    {
      provide: ICreateEvent,
      useClass: CreateEvent,
    },
    {
      provide: IModelValidator<MEvent>,
      useClass: EventValidator,
    },
  ],
})
export class UserModule {}
