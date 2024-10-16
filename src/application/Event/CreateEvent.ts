import {
  Category,
  Duration,
  ECategories,
  ECategoriesArray,
  ETicketTierArray,
  IModelValidator,
  IServices,
  IServicesEvent,
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
    private readonly eventServices: IServicesEvent,
    private readonly userServices: IServices<User>,
    private readonly notifications: Notifications,
    private readonly eventValidator: IModelValidator<MEvent>,
    private readonly ticketValidator: IModelValidator<Ticket>,
    private readonly localizationValidator: IModelValidator<Localization>,
    private readonly durationValidator: IModelValidator<Duration>,
    private readonly categoryValidator: IModelValidator<Category>,
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
        categories: categoriesInput,
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

      if (!event.isValid(this.eventValidator)) {
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
