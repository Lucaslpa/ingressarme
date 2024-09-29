import { UserInput } from '../dto/UserInput';
import { Response } from '../dto/Response';
export interface ISignupUser {
  execute(input: UserInput): Response<UserInput>;
}
