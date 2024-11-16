import { randomUUID, UUID } from 'crypto';
import { ENotification, Notifier } from '../../business/entityNotification';
import { Notifications } from '../entityNotification/Notifications';
import { IModelValidator } from '../interfaces/IModelValidator';

export class Entity<T extends Entity<T>> extends Notifier {
  public id: string;

  constructor(
    protected readonly notifications: Notifications,
    private readonly validator?: IModelValidator<T>,
    protected readonly _id?: string,
  ) {
    super(notifications);
    this.id = _id ? _id : randomUUID();
  }

  public isValid(validator: IModelValidator<T>): boolean;
  public isValid(): boolean;
  public isValid(validator?: IModelValidator<T>): boolean {
    const effectiveValidator = validator || this.validator;

    if (!effectiveValidator) {
      this.notifications.push(new ENotification('Validator not found'));
      return false;
    }

    const { isValid, errors } = effectiveValidator.validate(
      this as unknown as T,
    );

    if (!isValid) {
      this.notifications.pushNotifations(
        errors.map((error) => new ENotification(error)),
      );
    }

    return !this.notifications.hasNotifications;
  }
}
