import { Response, UserInput, UserOutput } from './dto';

import { IUserModifier } from './interfaces/IUserModifier';
import { Injectable } from '@nestjs/common';
import { User, Notifications, IServicesUser, IUserValidator } from '@business';

@Injectable()
export class UserModifier implements IUserModifier {
  constructor(
    private readonly userValidator: IUserValidator,
    private readonly userServices: IServicesUser,
    protected readonly notifications: Notifications,
  ) {}

  async create(input: UserInput): Promise<Response<UserOutput>> {
    try {
      const user = new User(
        input.name,
        input.email,
        input.password,
        input.role,
        this.notifications,
      );
      if (!user.isValid(this.userValidator)) {
        return new Response<UserInput>(false, null, user.getNotifications);
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
    try {
      await this.userServices.delete(id);
      return new Response<{
        userId: string;
      }>(true, { userId: id }, []);
    } catch (error) {
      if (error instanceof Error) {
        return new Response<{ userId: string }>(false, { userId: id }, [
          error.message,
        ]);
      }
      return new Response<{ userId: string }>(false, { userId: id }, [
        'Error on user deletion',
      ]);
    }
  }

  async update(input: UserInput): Promise<Response<UserOutput>> {
    try {
      const user = new User(
        input.name,
        input.email,
        input.password,
        input.role,
        this.notifications,
        input.id,
      );
      if (!user.id)
        return new Response<UserOutput>(false, null, [
          'id from user is required',
        ]);

      const oldUser = await this.userServices.getById(user.id);

      if (!oldUser) {
        return new Response<UserOutput>(false, null, ['User not found']);
      }
      const newUser = new User(
        user.name || oldUser.name,
        user.email || oldUser.email,
        user.password || oldUser.password || '12345678',
        oldUser.role,
        this.notifications,
        oldUser.id,
      );

      if (!newUser.isValid(this.userValidator)) {
        return new Response<UserOutput>(false, null, newUser.getNotifications);
      }

      const updatedUser = await this.userServices.update(newUser);

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
    } catch (error) {
      if (error instanceof Error) {
        return new Response<UserOutput>(false, null, [error.message]);
      }
      return new Response<UserOutput>(false, null, ['Error on user update']);
    }
  }
}
