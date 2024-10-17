import {
  Category,
  Duration,
  ERole,
  EventValidator,
  ICategoryValidator,
  IDurationValidator,
  IEventValidator,
  ILocalizationValidator,
  IModelValidator,
  IServices,
  IServicesEvent,
  IServicesUser,
  ITicketValidator,
  Localization,
  MEvent,
  Notifications,
  Ticket,
  User,
} from '@business';
import { CreateEventInput } from '../dto/CreateEventInput';
import { ICreateEvent } from '../interfaces/ICreateEvent';
import { Response } from '../dto';
import { Injectable } from '@nestjs/common';
import { z } from 'zod';

const schema = z
  .object({
    name: z
      .string()
      .min(5, 'Name must be at least 5 characters long')
      .max(50, 'Name must be at most 50 characters long'),
    description: z
      .string()
      .min(50, 'Description must be at least 50 characters long')
      .max(800, 'Description must be at most 800 characters long'),
    iconImg: z.string().url('Icon image must be a valid URL'),
    bannerImg: z.string().url('Banner image must be a valid URL'),
  })
  .passthrough();
@Injectable()
export class CreateEvent implements ICreateEvent {
  constructor(
    private readonly eventServices: IServicesEvent,
    private readonly userServices: IServicesUser,
    private readonly notifications: Notifications,
    private readonly eventValidator: IEventValidator,
    private readonly ticketValidator: ITicketValidator,
    private readonly localizationValidator: ILocalizationValidator,
    private readonly durationValidator: IDurationValidator,
    private readonly categoryValidator: ICategoryValidator,
  ) {}

  async execute(
    input: CreateEventInput,
  ): Promise<Response<{ eventId: string }>> {
    try {
      const {
        userId,
        name,
        description,
        endDate,
        startDate,
        ticketInfos,
        categories: categoriesInput,
        latitude,
        longitude,
        iconImg,
        bannerImg,
        address,
      } = input;

      if (!userId)
        return new Response<{ eventId: string }>(false, null, [
          'userId is required',
        ]);

      const user = await this.userServices.getById(userId);

      if (!user) {
        return new Response<{ eventId: string }>(false, null, [
          'User not found',
        ]);
      }

      if (user.role !== ERole.enterprise) {
        return new Response<{ eventId: string }>(false, null, [
          'User must be an enterprise',
        ]);
      }

      const localization = new Localization(
        address,
        latitude,
        longitude,
        this.notifications,
        this.localizationValidator,
      );

      const duration = new Duration(
        startDate,
        endDate,
        this.notifications,
        this.durationValidator,
      );

      const event = new MEvent(
        name,
        description,
        duration,
        localization,
        iconImg,
        bannerImg,
        userId,
        this.notifications,
      );

      const tickets = ticketInfos.map(
        (info) =>
          new Ticket(
            info.description,
            info.price,
            info.quantity,
            event.id,
            info.tier,
            info.currency,
            this.notifications,
            this.ticketValidator,
          ),
      );

      const categories = categoriesInput.map(
        (categorie) =>
          new Category(categorie, this.notifications, this.categoryValidator),
      );

      event.setTickets(tickets);
      event.setCategories(categories);

      if (!event.isValid(new EventValidator())) {
        return new Response<{ eventId: string }>(
          false,
          null,
          event.getNotifications,
        );
      }

      const eventResult = await this.eventServices.add(event);

      return new Response<{ eventId: string }>(
        true,
        { eventId: eventResult.id },
        [],
      );
    } catch (error) {
      if (error instanceof Error) {
        return new Response<{ eventId: string }>(false, null, [error.message]);
      }
      return new Response<{ eventId: string }>(false, null, [
        'An error occurred on create event',
      ]);
    }
  }
}
