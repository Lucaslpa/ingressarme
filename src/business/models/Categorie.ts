import { Notifications } from '../entityNotification';
import { Entity } from './Entity';

export class Categorie extends Entity<Categorie> {
  constructor(
    public readonly name: string,
    protected notifications: Notifications,
  ) {
    super(notifications);
  }
}
