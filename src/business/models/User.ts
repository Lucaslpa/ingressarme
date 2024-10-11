import { Notifications } from '../entityNotification/Notifications';
import { ERole } from '../interfaces/ERole';
import { Entity } from './Entity';

export class User extends Entity<User> {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: ERole,
    protected notifications: Notifications,
  ) {
    super(notifications);
  }
}
