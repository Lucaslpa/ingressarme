import { UUID } from 'node:crypto';
import { Notifications } from '../entityNotification';
import { Entity } from './Entity';

export class Categorie extends Entity<Categorie> {
  constructor(
    public readonly name: string,
    protected notifications: Notifications,
    protected readonly _id?: UUID,
  ) {
    super(notifications, undefined, _id);
  }
}
