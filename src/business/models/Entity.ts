import { ENotification, Notifier } from '../../business/entityNotification';
import { IModelValidator } from '../types/IModelValidator';

export class Entity extends Notifier {
  constructor() {
    super();
  }

  public isValid(validator: IModelValidator<this>) {
    const { isValid, errors } = validator.validate(this);

    if (!isValid) {
      this.addNotification(errors.map((error) => new ENotification(error)));
    }

    return !this.hasNotifications();
  }
}
