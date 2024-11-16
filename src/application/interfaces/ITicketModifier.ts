import { Response } from '../dto';
import {
  CreateTicketInput,
  RemoveTicketInput,
  UpdateTicketInput,
} from '../dto/TicketModifierInput';

export abstract class ITicketModifier {
  abstract add(
    input: CreateTicketInput,
  ): Promise<Response<{ ticketId: string } | null>>;
  abstract update(input: UpdateTicketInput): Promise<Response<null>>;
  abstract remove(input: RemoveTicketInput): Promise<Response<null>>;
}
