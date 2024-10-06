import { Notifier } from '@EntityNotifier';
import { Entity } from '../models';

export abstract class IServices<T extends Entity> {
  abstract add(entity: T): Promise<T>;
  abstract update(entity: T): Promise<T>;
  abstract delete(id: string): Promise<void>;
}
