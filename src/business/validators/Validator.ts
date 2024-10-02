import { IModelValidator } from '../types/IModelValidator';
import { User } from '../models/User';

import zod from 'zod';
import { ERole } from '../types/ERole';
import { Entity } from '../models/Entity';

export class Validator<T extends Entity> implements IModelValidator<T> {
  constructor(private readonly schema: zod.ZodObject<any>) {}

  validate(model: T) {
    const validationResult = this.schema.safeParse(model);

    if (!validationResult.success) {
      const errorDetails = validationResult.error.errors.map(
        (error) => `${error.path.join('.')}: ${error.message}`,
      );

      return {
        isValid: false,
        errors: errorDetails,
      };
    }

    return {
      isValid: true,
      errors: [],
    };
  }
}
