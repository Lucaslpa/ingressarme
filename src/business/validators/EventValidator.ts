import zod from 'zod';
import { Validator } from './Validator';
import { MEvent } from '../models/Event';

export class EventValidator extends Validator<MEvent> {
  constructor() {
    super(schema);
  }
}

const schema = zod
  .object({
    name: zod
      .string()
      .min(5, 'Name must be at least 5 characters long')
      .max(50, 'Name must be at most 50 characters long'),
    description: zod
      .string()
      .min(50, 'Description must be at least 50 characters long')
      .max(800, 'Description must be at most 800 characters long'),
    ticketQuantity: zod.number().min(10, 'Ticket quantity must be at least 10'),
    categoriesIds: zod
      .array(zod.string())
      .min(1, 'At least one category must be informed'),
    iconImg: zod.string().url('Icon image must be a valid URL'),
    bannerImg: zod.string().url('Banner image must be a valid URL'),
  })
  .passthrough();
