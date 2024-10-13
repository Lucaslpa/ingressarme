import { IServicesEvent, MEvent } from '@business';
import { Database } from '../data/Database';

export class EventServices extends IServicesEvent {
  private readonly database = new Database();

  addCategory(eventId: string, categoryId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  removeCategory(eventId: string, categoryId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  add(entity: MEvent): Promise<MEvent> {
    throw new Error('Method not implemented.');
  }
  update(entity: MEvent): Promise<MEvent> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getById(id: string): Promise<MEvent> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<MEvent[]> {
    throw new Error('Method not implemented.');
  }
}
