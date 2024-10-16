import { UUID } from 'node:crypto';
import { Notifications } from '../entityNotification';
import { Entity } from './Entity';
import { ECategories, IModelValidator } from '../interfaces';

export class Category extends Entity<Category> {
  constructor(
    public readonly name: ECategories,
    protected notifications: Notifications,
    protected categorieValidator: IModelValidator<Category>,
  ) {
    super(notifications, categorieValidator);
    this.id = name;
  }
}
