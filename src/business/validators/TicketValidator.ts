import zod, { string } from 'zod';
import { Validator } from './Validator';
import { Ticket } from '../models/Ticket';
import { ETicketTier } from '../interfaces';

export class TicketValidator extends Validator<Ticket> {
  constructor() {
    super(schema);
  }
}

const schema = zod
  .object({
    description: zod
      .string()
      .min(10, 'Description must be at least 10 characters long')
      .max(200, 'Description must be at most 200 characters long'),
    quantity: zod.number().min(5, 'Ticket quantity must be at least 10'),
    price: zod.number().min(0, 'Price must be at least 0'),
    tier: zod.nativeEnum(ETicketTier, {
      message: 'Invalid type of ticket',
    }),
    currency: string().min(1, 'Currency must be at least 1'),
  })
  .passthrough();
