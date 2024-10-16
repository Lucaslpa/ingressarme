import { ECategories, IModelValidator } from '../interfaces';
import { Category } from '../models';
import { z } from 'zod';
import { Validator } from './Validator';

export class CategoryValidator extends Validator<Category> {
  constructor() {
    super(schema);
  }
}

const schema = z
  .object({
    name: z.nativeEnum(ECategories, {
      message: 'Invalid category',
    }),
  })
  .passthrough();
