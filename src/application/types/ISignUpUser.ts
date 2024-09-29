import { UserInput } from '../dto/UserInput';
import { Response } from '../dto/Response';
import { UserOutput } from '../dto/UserOutput';
export interface ISignupUser {
  execute(input: UserInput): Promise<Response<UserOutput>>;
}
