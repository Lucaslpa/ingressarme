import { Body, Controller, Post } from '@nestjs/common';
import { UserInput } from '../../application/dto/UserInput';
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
