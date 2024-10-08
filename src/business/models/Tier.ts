import { Notifications } from '../entityNotification/Notifications';
import { Entity } from './Entity';

export class Tier extends Entity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    protected notifications: Notifications,
  ) {
    super(notifications);
  }
}
