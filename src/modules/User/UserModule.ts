import { Module } from '@nestjs/common';

import { UserValidator } from '../../business/validators/UserValidator';
import { UserServices } from '../../infra/services/UserServices';
import { UserController } from './UserController';
import { UserModifier } from '../../application/UserModifier';
import { IServices } from 'src/business/services/IServices';
import { IModelValidator } from 'src/business/types/IModelValidator';
import { IUserModifier } from 'src/application/types/IUserModifier';

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
