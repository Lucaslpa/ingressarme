import { MEvent } from '../models';
import { IServices } from './IServices';

export abstract class IServicesEvent extends IServices<MEvent> {
  abstract addCategory(eventId: string, categoryId: string): Promise<void>;

  abstract removeCategory(eventId: string, categoryId: string): Promise<void>;
}
