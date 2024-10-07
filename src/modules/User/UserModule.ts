import { Module } from '@nestjs/common';

import { UserValidator, IModelValidator, IServices } from '@business';
import { IUserModifier, UserModifier } from '@application';

import { ITokenIsValid, UserServices, TokenIsValid } from '@infra';
import { UserController } from './UserController';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: ITokenIsValid,
      useValue: TokenIsValid,
    },
    {
      provide: IModelValidator,
      useClass: UserValidator,
    },
    {
      provide: IServices,
      useClass: UserServices,
    },
    {
      provide: IUserModifier,
      useClass: UserModifier,
    },
  ],
})
export class UserModule {}
