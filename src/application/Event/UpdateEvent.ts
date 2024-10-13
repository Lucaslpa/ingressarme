import {
  Duration,
  IModelValidator,
  IServices,
  Localization,
  MEvent,
  Notifications,
  Ticket,
  User,
} from '@business';
import { Response } from '../dto';
import { UpdateEventInput } from '../dto/UpdateEventInput';
import { IUpdateEvent } from '../interfaces/IUpdateEvent';

export class UpdateEvent extends IUpdateEvent {
  constructor(
    private readonly eventServices: IServices<MEvent>,
    private readonly userServices: IServices<User>,
    private readonly notifications: Notifications,
    private readonly eventValidatoOptional: IModelValidator<MEvent>,
    private readonly ticketValidatorOptional: IModelValidator<Ticket>,
    private readonly localizationValidatorOptional: IModelValidator<Localization>,
    private readonly durationValidatorOptional: IModelValidator<Duration>,
  ) {
    super();
  }

  async execute(
    input: UpdateEventInput,
  ): Promise<Response<{ eventId: string }>> {
    try {
      const {
        eventId,
        userId,
        name,
        description,
        endDate,
        startDate,
        latitude,
        longitude,
        iconImg,
        bannerImg,
        address,
      } = input;

      if (!eventId || !userId) {
        return new Response<{ eventId: string }>(false, null, [
          'eventId and userId are both required',
        ]);
      }

      const user = await this.userServices.getById(userId);

      if (!user) {
        return new Response<{ eventId: string }>(false, null, [
          'User not found',
        ]);
      }

      const oldEvent = await this.eventServices.getById(eventId);

      if (!oldEvent) {
        return new Response<{ eventId: string }>(false, null, [
          'Event not found',
        ]);
      }

      const localization = new Localization(
        address || oldEvent.localization.address,
        latitude || oldEvent.localization.latitude,
        longitude || oldEvent.localization.longitude,
        this.notifications,
        this.localizationValidatorOptional,
      );

      const duration = new Duration(
        startDate || oldEvent.date.startDate,
        endDate || oldEvent.date.endDate,
        this.notifications,
        this.durationValidatorOptional,
      );

      const newEvent = new MEvent(
        name || oldEvent.name,
        description || oldEvent.description,
        duration,
        oldEvent.categoriesIds,
        localization,
        iconImg || oldEvent.iconImg,
        bannerImg || oldEvent.bannerImg,
        oldEvent.userId,
        this.notifications,
        oldEvent.id,
      );

      if (!newEvent.isValid(this.eventValidatoOptional)) {
        return new Response<{ eventId: string }>(
          false,
          null,
          newEvent.getNotifications,
        );
      }

      const eventResult = await this.eventServices.update(newEvent);

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
        'Error on event update',
      ]);
    }
  }
}
