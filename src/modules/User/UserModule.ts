import { Module } from '@nestjs/common';

import { UserValidator } from '../../business/validators/UserValidator';
import { UserServices } from '../../infra/services/UserServices';
import { UserController } from './UserController';
import { SignupUser } from '../../application/SignupUser';
import { IServices } from 'src/business/services/IServices';
import { IModelValidator } from 'src/business/types/IModelValidator';
import { ISignupUser } from 'src/application/types/ISignUpUser';

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
      provide: ISignupUser,
      useClass: SignupUser,
    },
  ],
})
export class UserModule {}
