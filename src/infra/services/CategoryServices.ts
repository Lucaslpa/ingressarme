import { Category, IServicesCategory, Notifications } from '@business';
import { Database } from '../data/Database';

export class CategoryServices extends IServicesCategory {
  private readonly database = new Database();

  async getCategoriesFromEvents(eventId: string): Promise<Category[]> {
    const query = 'SELECT * FROM event_categories WHERE event_id = $1';
    const values = [eventId];
    const queryResult = await this.database.query(query, values);
    const categories = queryResult.map(
      (category: any) =>
        new Category(category.category_name, new Notifications()),
    );
    return categories;
  }

  async addCategoriesToEvent(
    eventiId: string,
    categories: Category[],
  ): Promise<string[]> {
    const query =
      'INSERT INTO event_categories (event_id, category_name) VALUES ($1, $2)';

    const promises = categories.map(async (category) => {
      const values = [eventiId, category.id];
      await this.database.query(query, values);
    });

    await Promise.all(promises);

    return categories.map((category) => category.id);
  }

  async removeCategoriesFromEvent(
    eventId: string,
    categories: Category[],
  ): Promise<void> {
    const query =
      'DELETE FROM event_categories WHERE category_name = $1 AND event_id = $2';

    const promises = categories.map(async (category) => {
      const values = [category.id, eventId];
      await this.database.query(query, values);
    });

    await Promise.all(promises);
  }

  add(entity: Category): Promise<Category> {
    throw new Error('Method not implemented.');
  }
  update(entity: Category): Promise<Category> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getById(id: string): Promise<Category | null> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<Category[]> {
    throw new Error('Method not implemented.');
  }
}
