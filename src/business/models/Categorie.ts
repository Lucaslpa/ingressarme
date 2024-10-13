import { UUID } from 'node:crypto';
import { Notifications } from '../entityNotification';
import { Entity } from './Entity';
import { ECategories } from '../interfaces';

export class Categorie extends Entity<Categorie> {
  constructor(
    public readonly name: ECategories,
    protected notifications: Notifications,
  ) {
    super(notifications, undefined);
    this.id = name;
  }
}
