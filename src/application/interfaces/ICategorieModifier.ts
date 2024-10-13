import { CreateEventInput } from '../dto/CreateEventInput';
import { CategorieModifierInput, Response } from '../dto';

export abstract class ICategorieModifier {
  abstract add(input: CategorieModifierInput): Promise<Response<null>>;

  abstract remove(input: CategorieModifierInput): Promise<Response<null>>;
}
