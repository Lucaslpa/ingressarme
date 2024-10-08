import { ENotification, Notifier } from '../../business/entityNotification';
import { Notifications } from '../entityNotification/Notifications';
import { IModelValidator } from '../interfaces/IModelValidator';

export class Entity extends Notifier {
  constructor(protected readonly notifications: Notifications) {
    super(notifications);
  }

  public isValid(validator: IModelValidator<this>) {
    const { isValid, errors } = validator.validate(this);

    if (!isValid) {
      console.log('errors', this.notifications);
      this.notifications.pushNotifations(
        errors.map((error) => new ENotification(error)),
      );
    }

    return !this.notifications.hasNotifications;
  }
}
