import { Category, MEvent, Ticket } from '../models';
import { IServices } from './IServices';

export abstract class IServicesCategory extends IServices<Category> {
  abstract getCategoriesFromEvents(eventId: string): Promise<Category[]>;
  abstract addCategoriesToEvent(
    eventiId: string,
    categories: Category[],
  ): Promise<string[]>;
  abstract removeCategoriesFromEvent(
    eventId: string,
    categories: Category[],
  ): Promise<void>;
}
