import { CreateEventInput } from '../dto/CreateEventInput';
import { CategoryModifierInput, Response } from '../dto';

export abstract class ICategoryModifier {
  abstract add(
    input: CategoryModifierInput,
  ): Promise<Response<string[] | null>>;

  abstract remove(input: CategoryModifierInput): Promise<Response<null>>;
}
