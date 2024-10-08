import { ENotification } from '../entityNotification';
import { Notifications } from '../entityNotification/Notifications';
import { IModelValidator } from '../interfaces';
import { Entity } from './Entity';

export class Duration extends Entity {
  constructor(
    public readonly startDate: Date,
    public readonly endDate: Date,
    public validator: IModelValidator<Duration>,
    protected notifications: Notifications,
  ) {
    super(notifications);
  }

  public isValid(): boolean {
    const { isValid, errors } = this.validator.validate(this);

    if (!isValid) {
      this.addNotifications(errors.map((error) => new ENotification(error)));
    }

    return !this.hasNotifications();
  }
}
