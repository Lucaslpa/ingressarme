import { Module, Scope } from '@nestjs/common';

import {
  UserValidator,
  IModelValidator,
  Notifications,
  User,
  IServicesUser,
  IUserValidator,
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
      provide: IServicesUser,
      useClass: UserServices,
    },
    {
      provide: IUserValidator,
      useClass: UserValidator,
    },
    {
      provide: IUserModifier,
      useClass: UserModifier,
    },
  ],
})
export class UserModule {}
