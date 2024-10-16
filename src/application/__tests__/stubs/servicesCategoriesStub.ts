import { IServices, Category, Notifications, ECategories } from '@business';
import { CategoryValidator } from '@business';

export const servicesCategoriesStub: IServices<Category> = {
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
};
