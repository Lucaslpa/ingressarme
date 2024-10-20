import { ECategoriesArray } from '@business';

export class CategoryModifierInput {
  constructor(
    public categories: typeof ECategoriesArray = [],
    public readonly eventId: string,
  ) {}
}
