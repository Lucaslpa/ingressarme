import { z } from 'zod';
import { Validator } from './Validator';
import { Localization } from '../models/Localization';

export class LocalizationValidator extends Validator<Localization> {
  constructor() {
    super(schema);
  }
}

const schema = z
  .object({
    address: z.string().min(10, 'Adress must be at least 5 characters long'),
    latitude: z
      .number()
      .min(-90, 'latitude is invalid')
      .max(90, 'latitude is invalid'),
    longitude: z
      .number()
      .min(-180, 'longitude is invalid')
      .max(180, 'longitude is invalid'),
  })
  .passthrough();
