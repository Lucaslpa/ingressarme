import { ENotification } from '../entityNotification';
import { Notifications } from '../entityNotification/Notifications';
import { IModelValidator } from '../interfaces';
import { Duration } from './Duration';
import { Entity } from './Entity';
import { Localization } from './Localization';

export class MEvent extends Entity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly date: Duration,
    public readonly localization: Localization,
    public readonly tickets: number,
    public readonly categoriesIds: string[],
    public readonly iconImg: string,
    public readonly bannerImg: string,
    public readonly userId: string,
    protected notifications: Notifications,
  ) {
    super(notifications);
  }

  public isValid(validator: IModelValidator<this>): boolean {
    const { isValid, errors } = validator.validate(this);
    this.date.isValid();
    this.localization.isValid();

    if (!isValid) {
      this.addNotifications(errors.map((error) => new ENotification(error)));
    }

    return !this.hasNotifications();
  }
}
