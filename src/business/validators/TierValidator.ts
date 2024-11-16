import zod from 'zod';
import { Validator } from './Validator';
import { ETicketTier } from '../interfaces/ETicketTiers';
import { Tier } from '../models/Tier';
import { ETiersColors } from '../interfaces/ETierColors';

export class TierValidator extends Validator<Tier> {
  constructor() {
    super(schema);
  }
}

const schema = zod
  .object({
    name: zod.nativeEnum(ETicketTier, {
      message: 'Invalid ticket tier',
    }),
    color: zod.nativeEnum(ETiersColors, {
      message: 'Invalid tier color',
    }),
  })
  .passthrough();
