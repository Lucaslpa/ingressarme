import { Entity } from '../models/Entity';

export abstract class IModelValidator<T extends Entity<T>> {
  abstract validate(model: T): { isValid: boolean; errors: string[] };
}
