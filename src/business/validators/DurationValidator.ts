import { z } from 'zod';
import { Validator } from './Validator';
import { MEvent } from '../models/Event';
import { Duration } from '../models/Duration';

export class DurationValidator extends Validator<Duration> {
  constructor() {
    super(schema);
  }
}

const isoDateString = z
  .string({
    message: 'Date must be in ISO 8601 format (e.g., 2024-11-01T12:00:00Z)',
  })
  .regex(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,6})?Z$/,
    'Date must be in ISO 8601 format (e.g., 2024-11-01T12:00:00Z)',
  );

const schema = z
  .object({
    startDate: isoDateString.refine((date) => new Date(date) > new Date(), {
      message: 'Start date must be in the future',
    }),
    endDate: isoDateString,
  })
  .passthrough()
  .superRefine((data, ctx) => {
    if (new Date(data.startDate) < new Date(data.endDate)) return;
    ctx.addIssue({
      path: ['endDate'],
      message: 'End date must be after start date',
      code: 'custom',
    });
  });
