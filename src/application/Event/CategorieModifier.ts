import {
  Categorie,
  IServices,
  IServicesEvent,
  MEvent,
  Notifications,
} from '@business';
import { CategorieModifierInput, Response } from '../dto';
import { CreateEventInput } from '../dto/CreateEventInput';
import { ICategorieModifier } from '../interfaces/ICategorieModifier';

export class CategorieModifier extends ICategorieModifier {
  constructor(
    private readonly eventServices: IServicesEvent,
    private readonly categoriesServices: IServices<Categorie>,
  ) {
    super();
  }

  async add(input: CategorieModifierInput): Promise<Response<null>> {
    try {
      const { eventId, categoryId } = input;
      if (!eventId || !categoryId)
        return new Response<null>(false, null, [
          'eventId and categoryId are both required',
        ]);
      const event = await this.eventServices.getById(eventId);
      if (!event) return new Response<null>(false, null, ['Event not found']);
      const category = await this.categoriesServices.getById(categoryId);
      if (!category)
        return new Response<null>(false, null, ['Category not found']);
      await this.eventServices.addCategory(event.id, category.id);
      return new Response(true, null, []);
    } catch (error) {
      if (error instanceof Error) {
        return new Response<null>(false, null, [error.message]);
      }
      return new Response<null>(false, null, ['Error on category addition']);
    }
  }

  async remove(input: CategorieModifierInput): Promise<Response<null>> {
    try {
      const { eventId, categoryId } = input;
      if (!eventId || !categoryId)
        return new Response<null>(false, null, [
          'eventId and categoryId are both required',
        ]);
      const event = await this.eventServices.getById(eventId);
      if (!event) return new Response<null>(false, null, ['Event not found']);
      const category = await this.categoriesServices.getById(categoryId);
      if (!category)
        return new Response<null>(false, null, ['Category not found']);
      await this.eventServices.removeCategory(event.id, category.id);
      return new Response(true, null, []);
    } catch (error) {
      if (error instanceof Error) {
        return new Response<null>(false, null, [error.message]);
      }
      return new Response<null>(false, null, ['Error on category removel']);
    }
  }
}
