import { Module } from '@nestjs/common';

import { UserValidator, IModelValidator, IServices } from '@business';
import { IUserModifier, UserModifier } from '@application';

import { UserServices } from '@infra';
import { UserController } from './UserController';

@Module({
  controllers: [UserController],
  providers: [
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
