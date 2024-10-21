import { z } from 'zod';
import { IAquisitionValidator } from './interfaces/IAquisitionValidator';

export class AcquisitionValidator extends IAquisitionValidator {
  constructor() {
    super(schema);
  }
}

const schema = z
  .object({
    userId: z.string().length(28, 'userId must be a 28-character string'),
    quantity: z
      .number()
      .int()
      .positive('Quantity must be a positive integer')
      .max(10, 'Quantity must be less than 10'),
  })
  .passthrough();
