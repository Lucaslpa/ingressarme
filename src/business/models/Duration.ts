import { ENotification } from '../entityNotification';
import { Notifications } from '../entityNotification/Notifications';
import { IModelValidator } from '../interfaces';
import { Entity } from './Entity';

export class Duration extends Entity<Duration> {
  constructor(
    public readonly startDate: Date,
    public readonly endDate: Date,
    protected notifications: Notifications,
    protected durationValidator: IModelValidator<Duration>,
  ) {
    super(notifications, durationValidator);
  }
}
