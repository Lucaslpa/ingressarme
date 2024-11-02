import { RefundTicketInput } from '../dto/RefundTicketInput';
import { Response } from '../dto';

export abstract class IRefundTicket {
  abstract execute(input: RefundTicketInput): Promise<Response<null>>;
}
