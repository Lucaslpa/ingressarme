import { User } from '../business/models/User';
import { Response } from './dto/Response';
import { UserInput } from './dto/UserInput';

import { ISignupUser } from './types/ISignUpUser';
import { UserValidator } from '../business/validators/UserValidator';
import { Injectable } from '@nestjs/common';
import { UserServices } from 'src/infra/services/UserServices';

@Injectable()
export class SignupUser implements ISignupUser {
  constructor(
    private readonly userValidator: UserValidator,
    private readonly userServices: UserServices,
  ) {}

  execute(input: UserInput): Response<UserInput> {
    const user = new User(
      input.id ?? '',
      input.name,
      input.email,
      input.password,
      input.role,
    );

    if (!user.isValid(this.userValidator)) {
      return new Response<UserInput>(false, null, user.getNotifications());
    }

    this.userServices.add(user);

    return new Response<UserInput>(true, input, []);
  }
}
