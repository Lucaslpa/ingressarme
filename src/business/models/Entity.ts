import { Notifier } from '../../business/entityNotification';
import { IModelValidator } from '../types/IModelValidator';

export class Entity extends Notifier {
  constructor() {
    super();
  }

  public isValid(validator: IModelValidator) {
    const { isValid, message } = validator.validate(this);

    if (!isValid) {
      this.addNotification({ message });
    }

    return !this.hasNotifications();
  }
}
