import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserInput } from '../../application/dto/UserInput';
import { SignupUser } from '../../application/SignupUser';
import { ISignupUser } from 'src/application/types/ISignUpUser';

@Controller()
export class UserController {
  constructor(private readonly signupUser: ISignupUser) {}

  @Post('/signup')
  signup(@Body() input: UserInput) {
    const response = this.signupUser.execute(input);
    return response;
  }
}
