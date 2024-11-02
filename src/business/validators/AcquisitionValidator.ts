import { z } from 'zod';
import { IAcquisitionValidator } from './interfaces/IAcquisitionValidator';

export class AcquisitionValidator extends IAcquisitionValidator {
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
