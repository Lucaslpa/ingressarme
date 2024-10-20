import { IServicesUser, User } from '@business';

export const servicesUserStub: IServicesUser = {
  add: function (entity: User): Promise<User> {
    return Promise.resolve(entity);
  },
  update: function (entity: User): Promise<User> {
    return Promise.resolve(entity);
  },
  delete: function (id: string): Promise<void> {
    return Promise.resolve();
  },
  getById: function (id: string): Promise<User> {
    return Promise.resolve({} as User);
  },
  getAll: function (): Promise<User[]> {
    throw new Error('Function not implemented.');
  },
};
