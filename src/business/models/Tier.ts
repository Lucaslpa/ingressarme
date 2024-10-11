import { Notifications } from '../entityNotification/Notifications';
import { IModelValidator } from '../interfaces';
import { ETicketTier } from '../interfaces/ETicketTiers';
import { ETiersColors } from '../interfaces/ETierColors';
import { Entity } from './Entity';

export class Tier extends Entity<Tier> {
  private _color: ETiersColors = ETiersColors[ETicketTier.free];
  constructor(
    public readonly name: ETicketTier,
    protected notifications: Notifications,
    protected tierValidator: IModelValidator<Tier>,
  ) {
    super(notifications, tierValidator);
    this.setColor();
  }

  public get color(): ETiersColors {
    return this._color;
  }

  public setColor(): void {
    this._color = ETiersColors[this.name];
  }
}
