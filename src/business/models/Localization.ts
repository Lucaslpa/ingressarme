import { ENotification } from '../entityNotification';
import { Notifications } from '../entityNotification/Notifications';
import { IModelValidator } from '../interfaces';
import { Entity } from './Entity';

export class Localization extends Entity<Localization> {
  constructor(
    public readonly address: string,
    public readonly latitude: number,
    public readonly longitude: number,
    protected notifications: Notifications,
    protected localizationValidator: IModelValidator<Localization>,
  ) {
    super(notifications, localizationValidator);
  }
}
