import { UserInput } from '../dto/UserInput';
import { Response } from '../dto/Response';
import { UserOutput } from '../dto/UserOutput';
export abstract class ISignupUser {
  abstract execute(input: UserInput): Promise<Response<UserOutput>>;
}
