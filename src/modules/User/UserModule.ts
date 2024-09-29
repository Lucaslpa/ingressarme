import { Module } from '@nestjs/common';

import { UserValidator } from '../../business/validators/UserValidator';
import { UserServices } from '../../infra/services/UserServices';
import { UserController } from './UserController';
import { SignupUser } from '../../application/SignupUser';

@Module({
  controllers: [UserController],
  providers: [UserValidator, UserServices, SignupUser],
})
export class UserModule {}
