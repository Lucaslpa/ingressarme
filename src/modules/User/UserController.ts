import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserInput } from '../../application/dto/UserInput';
import { SignupUser } from '../../application/SignupUser';

@Controller()
export class UserController {
  constructor(private readonly signupUser: SignupUser) {}

  @Post('/signup')
  signup(@Body() input: UserInput) {
    const response = this.signupUser.execute(input);
    return response;
  }
}
