import { z } from 'zod';
import { Validator } from './Validator';
import { MEvent } from '../models/Event';
import { Duration } from '../models/Duration';

export class DurationValidator extends Validator<Duration> {
  constructor() {
    super(schema);
  }
}

const schema = z
  .object({
    startDate: z.date().min(new Date(), 'Start date must be in the future'),
    endDate: z.date(),
  })
  .passthrough()
  .superRefine((data, ctx) => {
    if (data.endDate <= data.startDate) {
      ctx.addIssue({
        path: ['endDate'],
        message: 'End date must be after start date',
        code: 'custom',
      });
    }
  });
