import { CreateEventInput } from '../dto/CreateEventInput';
import { CategorieModifierInput, Response } from '../dto';
import {
  CreateTicketInput,
  RemoveTicketInput,
  UpdateTicketInput,
} from '../dto/TickertModifierInput';

export abstract class ITicketModifier {
  abstract add(input: CreateTicketInput): Promise<Response<null>>;
  abstract update(input: UpdateTicketInput): Promise<Response<null>>;
  abstract remove(input: RemoveTicketInput): Promise<Response<null>>;
}
