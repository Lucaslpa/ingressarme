import { z } from 'zod';
import { Validator } from './Validator';
import { MEvent } from '../models/Event';
import { ECategories } from '../interfaces';
import { IEventValidator } from './interfaces/IEventValidator';

export class EventValidator extends IEventValidator {
  constructor() {
    super(schema);
  }
}

const schema = z
  .object({
    name: z
      .string()
      .min(5, 'Name must be at least 5 characters long')
      .max(50, 'Name must be at most 50 characters long'),
    description: z
      .string()
      .min(50, 'Description must be at least 50 characters long')
      .max(800, 'Description must be at most 800 characters long'),
    iconImg: z.string().url('Icon image must be a valid URL'),
    bannerImg: z.string().url('Banner image must be a valid URL'),
  })
  .passthrough();
