import { ENotification } from './Notification';
import { Notifications } from './Notifications';

export abstract class Notifier {
  constructor(protected readonly notifications: Notifications) {}

  public addNotification(notification: ENotification): void {
    this.notifications.push(notification);
  }

  public addNotifications(notifications: ENotification[]): void {
    console.log('notifications1212', notifications);
    this.notifications.pushNotifations(notifications);
  }

  public get getNotifications(): string[] {
    return this.notifications.getNotifications;
  }

  public get getNotificationsEntities(): ENotification[] {
    return this.notifications.getNotificationsEntities;
  }

  public hasNotifications(): boolean {
    return this.notifications.hasNotifications;
  }
}
