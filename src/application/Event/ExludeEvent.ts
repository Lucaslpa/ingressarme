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
import { IExcludeEvent } from '../interfaces/IExludeEvent';
import { ExludeEventInput } from '../dto/ExludeEventInput';

export class ExcludeEvent extends IExcludeEvent {
  constructor(
    private readonly eventServices: IServices<MEvent>,
    private readonly userServices: IServices<User>,
  ) {
    super();
  }

  async execute(
    input: ExludeEventInput,
  ): Promise<Response<{ eventId: string }>> {
    try {
      const { userId, eventId } = input;

      if (!userId || !eventId)
        return new Response<{ eventId: string }>(false, null, [
          'userID and eventID are both required',
        ]);

      const user = await this.userServices.getById(userId);

      if (!user)
        return new Response<{ eventId: string }>(false, null, [
          'User not found',
        ]);

      const event = await this.eventServices.getById(eventId);

      if (!event)
        return new Response<{ eventId: string }>(false, null, [
          'Event not found',
        ]);

      await this.eventServices.delete(event.id);

      return new Response<{ eventId: string }>(true, { eventId: event.id }, []);
    } catch (error) {
      if (error instanceof Error) {
        return new Response<{ eventId: string }>(false, null, [error.message]);
      }
      return new Response<{ eventId: string }>(false, null, [
        'Error on event deletion',
      ]);
    }
  }
}
