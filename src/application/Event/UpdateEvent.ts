import {
  Duration,
  IDurationValidator,
  IEventValidator,
  ILocalizationValidator,
  IServicesEvent,
  IServicesUser,
  Localization,
  MEvent,
  Notifications,
} from '@business';
import { Response } from '../dto';
import { UpdateEventInput } from '../dto/UpdateEventInput';
import { IUpdateEvent } from '../interfaces/IUpdateEvent';
import { Injectable } from '@nestjs/common';
import { EventViewer } from '../dto/EventViewer';

@Injectable()
export class UpdateEvent extends IUpdateEvent {
  constructor(
    private readonly eventServices: IServicesEvent,
    private readonly userServices: IServicesUser,
    private readonly notifications: Notifications,
    private readonly eventValidator: IEventValidator,
    private readonly localizationValidator: ILocalizationValidator,
    private readonly durationValidator: IDurationValidator,
  ) {
    super();
  }

  async execute(input: UpdateEventInput) {
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
        return new Response(false, null, [
          'eventId and userId are both required',
        ]);
      }

      const user = await this.userServices.getById(userId);

      if (!user) {
        return new Response(false, null, ['Invalid userId']);
      }

      const oldEvent = await this.eventServices.getById(eventId);

      if (!oldEvent) {
        return new Response(false, null, ['Invalid eventId']);
      }

      const localization = new Localization(
        address || oldEvent.localization.address,
        latitude || oldEvent.localization.latitude,
        longitude || oldEvent.localization.longitude,
        this.notifications,
        this.localizationValidator,
      );

      const duration = new Duration(
        startDate || oldEvent.date.startDate,
        endDate || oldEvent.date.endDate,
        this.notifications,
        this.durationValidator,
      );

      const newEvent = new MEvent(
        name || oldEvent.name,
        description || oldEvent.description,
        duration,
        localization,
        iconImg || oldEvent.iconImg,
        bannerImg || oldEvent.bannerImg,
        oldEvent.userId,
        this.notifications,
        oldEvent.id,
      );

      if (!newEvent.isValid(this.eventValidator)) {
        return new Response(false, null, newEvent.getNotifications);
      }

      await this.eventServices.update(newEvent);

      const eventView = new EventViewer(
        newEvent.id,
        newEvent.name,
        newEvent.date.startDate,
        newEvent.date.endDate,
        newEvent.bannerImg,
        newEvent.iconImg,
        newEvent.description,
        newEvent.localization.address,
        newEvent.localization.latitude,
        newEvent.localization.longitude,
        [],
        [],
      );

      return new Response(true, eventView, []);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        return new Response(false, null, [error.message]);
      }
      return new Response(false, null, ['Error on event update']);
    }
  }
}
