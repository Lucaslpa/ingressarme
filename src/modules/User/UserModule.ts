import { Module, Scope } from '@nestjs/common';

import {
  UserValidator,
  IModelValidator,
  IServices,
  Notifications,
  User,
} from '@business';
import { IUserModifier, UserModifier } from '@application';

import { ITokenIsValid, UserServices, TokenIsValid } from '@infra';
import { UserController } from './UserController';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: Notifications,
      useClass: Notifications,
      scope: Scope.REQUEST,
    },
    {
      provide: ITokenIsValid,
      useValue: TokenIsValid,
    },
    {
      provide: IModelValidator,
      useClass: UserValidator,
    },
    {
      provide: IServices<User>,
      useClass: UserServices,
    },
    {
      provide: IUserModifier,
      useClass: UserModifier,
    },
  ],
})
export class UserModule {}
