import { Notifications } from '../entityNotification/Notifications';
import { ETicketTier } from '../interfaces/ETicketTiers';
import { ETiersColors } from '../interfaces/ETierColors';
import { Entity } from './Entity';

export class Ticket extends Entity {
  private _color: ETiersColors = ETiersColors[ETicketTier.free];

  constructor(
    public readonly id: string,
    public readonly description: string,
    public readonly price: number,
    public readonly tier: ETicketTier,
    public readonly quantity: number,
    public readonly eventId: string,
    protected notifications: Notifications,
  ) {
    super(notifications);
    this.setColor();
  }

  public get color(): ETiersColors {
    return this._color;
  }

  public setColor(): void {
    this._color = ETiersColors[this.tier];
  }
}
