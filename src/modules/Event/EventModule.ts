import { Module, Scope } from '@nestjs/common';

import {
  UserValidator,
  Notifications,
  EventValidator,
  IServicesEvent,
  TicketValidator,
  LocalizationValidator,
  DurationValidator,
  IEventValidator,
  IUserValidator,
  IDurationValidator,
  ITicketValidator,
  ILocalizationValidator,
  IServicesUser,
  ICategoryValidator,
  CategoryValidator,
  IServicesCategory,
  IServicesTicket,
} from '@business';
import {
  CategoryModifier,
  CreateEvent,
  ExcludeEvent,
  ICategoryModifier,
  ICreateEvent,
  ITicketModifier,
  TicketModifier,
  UpdateEvent,
} from '@application';

import {
  ITokenIsValid,
  UserServices,
  TokenIsValid,
  EventServices,
  CategoryServices,
  TicketServices,
} from '@infra';
import { EventController } from './EventController';
import { IExcludeEvent, IUpdateEvent } from '@application';

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
    {
      provide: IExcludeEvent,
      useClass: ExcludeEvent,
    },
    {
      provide: IUpdateEvent,
      useClass: UpdateEvent,
    },
    {
      provide: ITicketModifier,
      useClass: TicketModifier,
    },
    {
      provide: ICategoryModifier,
      useClass: CategoryModifier,
    },
    {
      provide: IServicesCategory,
      useClass: CategoryServices,
    },
    {
      provide: IServicesTicket,
      useClass: TicketServices,
    },
  ],
})
export class EventModule {}
