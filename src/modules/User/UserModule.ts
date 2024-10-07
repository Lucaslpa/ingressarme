import { Module } from '@nestjs/common';

import { UserValidator, IModelValidator, IServices } from '@business';
import { IUserModifier, UserModifier } from '@application';

import { UserServices, ValidateToken } from '@infra';
import { UserController } from './UserController';

@Module({
  controllers: [UserController],
  providers: [
    ValidateToken,
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
