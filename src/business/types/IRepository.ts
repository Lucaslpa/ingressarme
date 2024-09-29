export interface IRepository<T> {
  add(entity: T): Promise<T>;

  update(entity: T): Promise<T>;

  delete(id: string): Promise<void>;

  getById(id: string): Promise<T>;
}
