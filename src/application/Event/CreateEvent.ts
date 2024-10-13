import {
  Categorie,
  Duration,
  IModelValidator,
  IServices,
  Localization,
  MEvent,
  Notifications,
  Ticket,
  User,
} from '@business';
import { CreateEventInput } from '../dto/CreateEventInput';
import { ICreateEvent } from '../interfaces/ICreateEvent';
import { Response } from '../dto';

export class CreateEvent extends ICreateEvent {
  constructor(
    private readonly eventServices: IServices<MEvent>,
    private readonly categorieServices: IServices<Categorie>,
    private readonly ticketServices: IServices<Ticket>,
    private readonly userServices: IServices<User>,
    private readonly notifications: Notifications,
    private readonly eventValidator: IModelValidator<MEvent>,
    private readonly ticketValidator: IModelValidator<Ticket>,
    private readonly localizationValidator: IModelValidator<Localization>,
    private readonly durationValidator: IModelValidator<Duration>,
  ) {
    super();
  }

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
        categoriesIds,
        latitude,
        longitude,
        iconImg,
        bannerImg,
        address,
      } = input;

      const user = this.userServices.getById(userId);

      if (!user) {
        return new Response<{ eventId: string }>(false, null, [
          'User not found',
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
        categoriesIds,
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
            info.tierId,
            info.currency,
            this.notifications,
            this.ticketValidator,
          ),
      );

      event.setTickets(tickets);

      if (!event.isValid(this.eventValidator)) {
        return new Response<{ eventId: string }>(
          false,
          null,
          event.getNotifications,
        );
      }

      const areTiersValid = (await this.ticketServices.getAll()).every(
        (ticket) =>
          ticketInfos.map((info) => info.tierId).includes(ticket.tierId),
      );

      if (!areTiersValid) {
        return new Response<{ eventId: string }>(false, null, [
          'Tier from some ticket not exist',
        ]);
      }

      const areCategoriesValid = (await this.categorieServices.getAll()).every(
        (categorie) => categoriesIds.includes(categorie.id),
      );

      if (!areCategoriesValid) {
        return new Response<{ eventId: string }>(false, null, [
          'Some categorie not exist',
        ]);
      }

      const eventResult = await this.eventServices.add(event);

      return new Response<{ eventId: string }>(
        true,
        { eventId: eventResult.id },
        [],
      );
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        return new Response<{ eventId: string }>(false, null, [error.message]);
      }
      return new Response<{ eventId: string }>(false, null, [
        'An error occurred on create event',
      ]);
    }
  }
}
