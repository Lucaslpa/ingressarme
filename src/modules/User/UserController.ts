import {
  Body,
  Controller,
  Delete,
  HttpException,
  Param,
  Post,
  Put,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { UserInput, IUserModifier, Response, UserOutput } from '@application';
import { HttpResponseInterceptor } from '../../utils/HttpResponseInterceptor';
import { IsAuthenticatedInterceptor } from '../../utils/IsAuthenticatedInterceptor';

@UseInterceptors(HttpResponseInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userModifier: IUserModifier) {}

  @Post('/signup')
  async signup(@Body() input: UserInput) {
    const response = await this.userModifier.create(input);
    return response;
  }

  @UseInterceptors(IsAuthenticatedInterceptor)
  @Delete('/exclude/:id')
  async exlude(@Param('id') id: string) {
    const response = await this.userModifier.delete(id);
    return response;
  }

  @UseInterceptors(IsAuthenticatedInterceptor)
  @Put('/update/:id')
  async update(@Param('id') id: string, @Body() input: UserInput) {
    console.log(input, id, input.id !== id);
    if (input.id !== id)
      return new Response<UserOutput>(false, null, [
        'Id from body is different from id from params',
      ]);

    const response = await this.userModifier.update(input);
    return response;
  }
}
