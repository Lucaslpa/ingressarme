import { Notifier } from '@EntityNotifier';

export interface IServices<T extends Notifier> {
  add(entity: T): Promise<T>;
  update(entity: T): Promise<T>;
  delete(id: string): Promise<void>;
}
