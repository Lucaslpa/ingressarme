import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { UserInput } from '../../application/dto/UserInput';
import { IUserModifier } from 'src/application/types/IUserModifier';

@Controller()
export class UserController {
  constructor(private readonly userModifier: IUserModifier) {}

  @Post('/signup')
  async signup(@Body() input: UserInput) {
    const response = await this.userModifier.create(input);
    return response;
  }

  @Delete('/exclude/:id')
  async exlude(@Param('id') id: string) {
    const response = await this.userModifier.delete(id);
    return response;
  }

  @Post('/update/:id')
  async update(@Param('id') id: string, @Body() input: UserInput) {
    if (input.id !== id) {
      return {
        message: 'Id must be the same in the body and in the url',
        satus: 400,
      };
    }

    const response = await this.userModifier.update(input);
    return response;
  }
}
