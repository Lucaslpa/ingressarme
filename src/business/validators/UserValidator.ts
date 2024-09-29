import { IModelValidator } from '../types/IModelValidator';
import { User } from '../models/User';

import zod from 'zod';
import { ERole } from '../types/ERole';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserValidator implements IModelValidator {
  validate(model: User) {
    const validationResult = schema.safeParse(model);

    if (!validationResult.success) {
      const errorDetails = validationResult.error.errors.map(
        (error) => `${error.path.join('.')} ${error.message}`,
      );

      return {
        isValid: false,
        message: errorDetails[0],
      };
    }

    return {
      isValid: true,
      message: '',
    };
  }
}

const schema = zod.object({
  name: zod.string().min(5, 'Name must be at least 5 characters long'),
  email: zod.string().email('Invalid email format'),
  password: zod.string().min(8, 'Password must be at least 8 characters long'),
  role: zod.nativeEnum(ERole, {
    message: 'Invalid role. Must be 1 = enterprise, 2 = user',
  }),
});
