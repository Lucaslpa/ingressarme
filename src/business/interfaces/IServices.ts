import { Entity } from '../models';

export abstract class IServices<T extends Entity<T>> {
  abstract add(entity: T): Promise<T>;
  abstract update(entity: T): Promise<T>;
  abstract delete(id: string): Promise<void>;
  abstract getById(id: string): Promise<T | null>;
  abstract getAll(): Promise<T[]>;
}
