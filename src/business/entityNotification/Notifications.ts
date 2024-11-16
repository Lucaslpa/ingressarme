import { ENotification } from './Notification';

export class Notifications {
  protected notifications: ENotification[] = [];

  constructor() {}

  public push(notification: ENotification): void {
    this.notifications.push(notification);
  }
  public pushNotifations(notification: ENotification[]) {
    this.notifications.push(...notification);
  }

  public get getNotifications(): string[] {
    return this.notifications.map((notification) => notification.message);
  }

  public get getNotificationsEntities(): ENotification[] {
    return this.notifications;
  }

  public get hasNotifications(): boolean {
    return this.notifications.length > 0;
  }

  public clearNotifications(): void {
    this.notifications = [];
  }
}
