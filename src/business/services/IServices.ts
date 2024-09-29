import { Notifier } from '@EntityNotifier';
import { IServiceError } from './IServiceError';

export interface IServices<T extends Notifier> {
  add(entity: T): Promise<T | IServiceError>;
  update(entity: T): Promise<T>;
  delete(id: string): Promise<void>;
}
