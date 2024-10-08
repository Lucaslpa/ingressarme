import { ENotification } from '../entityNotification';
import { Notifications } from '../entityNotification/Notifications';
import { IModelValidator } from '../interfaces';
import { Entity } from './Entity';

export class Localization extends Entity {
  constructor(
    public readonly address: string,
    public readonly latitude: number,
    public readonly longitude: number,
    public readonly validator: IModelValidator<Localization>,
    protected notifications: Notifications,
  ) {
    super(notifications);
  }

  public isValid() {
    const { isValid, errors } = this.validator.validate(this);

    if (!isValid) {
      this.addNotifications(errors.map((error) => new ENotification(error)));
    }

    return !this.hasNotifications();
  }
}
