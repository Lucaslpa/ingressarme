import {
  Duration,
  IModelValidator,
  IServices,
  IServicesEvent,
  IServicesUser,
  Localization,
  MEvent,
  Notifications,
  Ticket,
  User,
} from '@business';
import { Response } from '../dto';
import { IExcludeEvent } from '../interfaces/IExludeEvent';
import { ExludeEventInput } from '../dto/ExludeEventInput';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExcludeEvent extends IExcludeEvent {
  constructor(
    private readonly eventServices: IServicesEvent,
    private readonly userServices: IServicesUser,
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
      console.log('userId', userId);
      const user = await this.userServices.getById(userId);

      if (!user)
        return new Response<{ eventId: string }>(false, null, [
          'User not found',
        ]);

      await this.eventServices.delete(input.eventId);
      return new Response<{ eventId: string }>(
        true,
        { eventId: input.eventId },
        [],
      );
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        return new Response<{ eventId: string }>(false, null, [error.message]);
      }
      return new Response<{ eventId: string }>(false, null, [
        'Error on event deletion',
      ]);
    }
  }
}
