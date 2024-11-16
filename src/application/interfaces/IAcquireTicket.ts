import { AcquireTicketInput, Response } from '../dto';

export abstract class IAcquireTicket {
  abstract execute(input: AcquireTicketInput): Promise<Response<null>>;
}
