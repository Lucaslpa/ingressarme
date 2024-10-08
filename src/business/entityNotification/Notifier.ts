import { ENotification } from './Notification';

export abstract class Notifier {
  protected notifications: ENotification[] = [];

  protected addNotification(notification: ENotification): void;
  protected addNotification(notification: ENotification[]): void;
  protected addNotification(
    notification: ENotification | ENotification[],
  ): void {
    if (Array.isArray(notification)) {
      this.notifications.push(...notification);
    } else {
      this.notifications.push(notification);
    }
  }

  public getNotifications(): string[] {
    return this.notifications.map((notification) => notification.message);
  }

  protected hasNotifications(): boolean {
    return this.notifications.length > 0;
  }

  protected clearNotifications(): void {
    this.notifications = [];
  }

  protected notify(): void {
    this.notifications.forEach((notification) => {
      console.log(notification.message);
    });
  }
}
