import { z } from 'zod';
import { IPaymentValidator } from './interfaces/IPaymentValidator';
import { EPaymentStatus } from '../interfaces';
import { EPaymentMethod } from '../interfaces/EPaymentMethod';

export class paymentValidator extends IPaymentValidator {
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
    amount: z.number().min(0, 'Amount must be at least 0'),
    date: isoDateString,
    methods: z.nativeEnum(EPaymentMethod, {
      message: 'Invalid method.',
    }),
    status: z.nativeEnum(EPaymentStatus, {
      message: 'Invalid status. Must be 1 = pending, 2 = approved, 3 = denied',
    }),
    currency: z.string().length(3, 'Currency must be a 3-character string'),
  })
  .passthrough();
