import {
  Category,
  Notifications,
  ECategories,
  IServicesCategory,
} from '@business';
import { CategoryValidator } from '@business';

export const servicesCategoriesStub: IServicesCategory = {
  add: function (entity: Category): Promise<Category> {
    throw new Error('Function not implemented.');
  },
  update: function (entity: Category): Promise<Category> {
    throw new Error('Function not implemented.');
  },
  delete: function (id: string): Promise<void> {
    throw new Error('Function not implemented.');
  },
  getById: function (id: string): Promise<Category> {
    return Promise.resolve(
      new Category(
        ECategories.BAR,
        new Notifications(),
        new CategoryValidator(),
      ),
    );
  },
  getAll: function (): Promise<Category[]> {
    return Promise.resolve([
      new Category(
        ECategories.BAR,
        new Notifications(),
        new CategoryValidator(),
      ),
      new Category(
        ECategories.DRAMA as any,
        new Notifications(),
        new CategoryValidator(),
      ),
    ]);
  },
  getCategoriesFromEvents: function (eventId: string): Promise<Category[]> {
    throw new Error('Function not implemented.');
  },
  addCategoriesToEvent: function (
    eventiId: string,
    categories: Category[],
  ): Promise<string[]> {
    throw new Error('Function not implemented.');
  },
  removeCategoriesFromEvent: function (
    eventId: string,
    categories: Category[],
  ): Promise<void> {
    throw new Error('Function not implemented.');
  },
};
