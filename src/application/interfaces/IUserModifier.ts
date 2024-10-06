import { UserInput } from '../dto/UserInput';
import { Response } from '../dto/Response';
import { UserOutput } from '../dto/UserOutput';

export abstract class IUserModifier {
  abstract create(input: UserInput): Promise<Response<UserOutput>>;
  abstract delete(id: string): Promise<Response<{ userId: string }>>;
  abstract update(input: UserInput): Promise<Response<UserOutput>>;
}
