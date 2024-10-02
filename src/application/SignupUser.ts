import { User } from '../business/models/User';
import { Response } from './dto/Response';
import { UserInput } from './dto/UserInput';

import { ISignupUser } from './types/ISignUpUser';
import { UserValidator } from '../business/validators/UserValidator';
import { Injectable } from '@nestjs/common';
import { UserServices } from 'src/infra/services/UserServices';
import { UserOutput } from './dto/UserOutput';

@Injectable()
export class SignupUser implements ISignupUser {
  constructor(
    private readonly userValidator: UserValidator,
    private readonly userServices: UserServices,
  ) {}

  async execute(input: UserInput): Promise<Response<UserOutput>> {
    try {
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

      const result = await this.userServices.add(user);

      const userResult = new UserOutput(
        result.id,
        result.name,
        result.email,
        result.role,
      );

      return new Response<UserOutput>(true, userResult, []);
    } catch (error) {
      if (error instanceof Error) {
        return new Response<UserOutput>(false, null, [error.message]);
      }
      return new Response<UserOutput>(false, null, ['Error on user creation']);
    }
  }
}
