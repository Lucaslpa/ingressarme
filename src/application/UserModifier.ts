import { User } from '../business/models/User';
import { Response } from './dto/Response';
import { UserInput } from './dto/UserInput';

import { IUserModifier } from './types/IUserModifier';
import { Injectable } from '@nestjs/common';
import { UserOutput } from './dto/UserOutput';
import { IServices } from 'src/business/services/IServices';
import { IModelValidator } from 'src/business/types/IModelValidator';

@Injectable()
export class UserModifier implements IUserModifier {
  constructor(
    private readonly userValidator: IModelValidator<User>,
    private readonly userServices: IServices<User>,
  ) {}

  async create(input: UserInput): Promise<Response<UserOutput>> {
    try {
      const user = new User(
        input.id,
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

  async delete(id: string) {
    await this.userServices.delete(id);
    return new Response<{
      userId: string;
    }>(true, { userId: id }, []);
  }

  async update(input: UserInput): Promise<Response<UserOutput>> {
    const user = new User(
      input.id,
      input.name,
      input.email,
      input.password,
      input.role,
    );

    if (!user.id)
      return new Response<UserOutput>(false, null, ['Id is required']);

    const updatedUser = await this.userServices.update(user);

    return new Response<UserOutput>(
      true,
      new UserOutput(
        updatedUser.id,
        updatedUser.name,
        updatedUser.email,
        updatedUser.role,
      ),
      [],
    );
  }
}
