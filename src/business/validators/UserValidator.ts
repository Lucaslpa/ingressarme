import { User } from '../models/User';

import zod from 'zod';
import { ERole } from '../interfaces/ERole';
import { Validator } from './Validator';

export class UserValidator extends Validator<User> {
  constructor() {
    super(schema);
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
