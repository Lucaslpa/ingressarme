import { Module, Scope } from '@nestjs/common';

import {
  UserValidator,
  IModelValidator,
  IServices,
  Notifications,
  MEvent,
  EventValidator,
  IServicesEvent,
  User,
  TicketValidator,
  Ticket,
  LocalizationValidator,
  Localization,
  Duration,
  DurationValidator,
  IEventValidator,
  IUserValidator,
  IDurationValidator,
  ITicketValidator,
  ILocalizationValidator,
  IServicesUser,
  ICategoryValidator,
  CategoryValidator,
} from '@business';
import { CreateEvent, ICreateEvent } from '@application';

import {
  ITokenIsValid,
  UserServices,
  TokenIsValid,
  EventServices,
} from '@infra';
import { EventController } from './EventController';

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
      useClass: TokenIsValid,
    },
    {
      provide: IUserValidator,
      useClass: UserValidator,
    },
    {
      provide: IEventValidator,
      useClass: EventValidator,
    },
    {
      provide: IDurationValidator,
      useClass: DurationValidator,
    },
    {
      provide: ITicketValidator,
      useClass: TicketValidator,
    },
    {
      provide: ICategoryValidator,
      useClass: CategoryValidator,
    },
    {
      provide: ILocalizationValidator,
      useClass: LocalizationValidator,
    },
    {
      provide: IServicesEvent,
      useClass: EventServices,
    },
    {
      provide: IServicesUser,
      useClass: UserServices,
    },
    {
      provide: ICreateEvent,
      useClass: CreateEvent,
    },
  ],
})
export class EventModule {}
