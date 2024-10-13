import { IServices, Categorie, Notifications } from '@business';

export const servicesCategoriesStub: IServices<Categorie> = {
  add: function (entity: Categorie): Promise<Categorie> {
    throw new Error('Function not implemented.');
  },
  update: function (entity: Categorie): Promise<Categorie> {
    throw new Error('Function not implemented.');
  },
  delete: function (id: string): Promise<void> {
    throw new Error('Function not implemented.');
  },
  getById: function (id: string): Promise<Categorie> {
    return Promise.resolve(new Categorie('1' as any, new Notifications()));
  },
  getAll: function (): Promise<Categorie[]> {
    return Promise.resolve([
      new Categorie('category1' as any, new Notifications()),
      new Categorie('category2' as any, new Notifications()),
    ]);
  },
};
