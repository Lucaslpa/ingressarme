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
  IServicesAcquisition,
  IServicesPayment,
  paymentValidator,
  IAcquisitionValidator,
  AcquisitionValidator,
} from '@business';
import {
  AcquireTicket,
  CategoryModifier,
  CreateEvent,
  ExcludeEvent,
  IAcquireTicket,
  ICategoryModifier,
  ICreateEvent,
  IRefundTicket,
  ITicketModifier,
  RefundTicket,
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
import { TicketController } from './TicketController';
import { IExcludeEvent, IUpdateEvent } from '@application';
import { AcquisitionServices } from 'src/infra/services/AcquisitionServices';
import { PaymentServices } from 'src/infra/services/PaymentServices';
import { IPaymentValidator } from 'src/business/validators/interfaces/IPaymentValidator';

@Module({
  controllers: [TicketController],
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
      provide: IAcquisitionValidator,
      useClass: AcquisitionValidator,
    },
    {
      provide: IPaymentValidator,
      useClass: paymentValidator,
    },
    {
      provide: IServicesPayment,
      useClass: PaymentServices,
    },
    {
      provide: IServicesTicket,
      useClass: TicketServices,
    },
    {
      provide: IServicesAcquisition,
      useClass: AcquisitionServices,
    },
    {
      provide: IAcquireTicket,
      useClass: AcquireTicket,
    },
    {
      provide: IRefundTicket,
      useClass: RefundTicket,
    },
    {
      provide: IAcquireTicket,
      useClass: AcquireTicket,
    },
  ],
})
export class TicketModule {}
