import { Ticket } from '../../models';
import { Validator } from '../Validator';

export abstract class ITicketValidator extends Validator<Ticket> {}
