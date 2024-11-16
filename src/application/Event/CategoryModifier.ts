import {
  Category,
  ECategoriesArray,
  ICategoryValidator,
  IServicesCategory,
  IServicesEvent,
  Notifications,
} from '@business';
import { CategoryModifierInput, Response } from '../dto';
import { ICategoryModifier } from '../interfaces/ICategoryModifier';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryModifier extends ICategoryModifier {
  constructor(
    private readonly categoriesServices: IServicesCategory,
    private readonly categoryValidator: ICategoryValidator,
    private readonly notifications: Notifications,
  ) {
    super();
  }

  async add(input: CategoryModifierInput): Promise<Response<string[] | null>> {
    try {
      const { eventId, categories: categoriesaInput } = input;

      if (!eventId || !categoriesaInput)
        return new Response<null>(false, null, [
          'eventId and categories are both required',
        ]);

      const categoriesInputModels = categoriesaInput.map(
        (category) =>
          new Category(category, this.notifications, this.categoryValidator),
      );

      const categoriesAreValid = categoriesInputModels.every((category) =>
        category.isValid(),
      );

      if (!categoriesAreValid) {
        return new Response<null>(false, null, ['Some invalid category']);
      }

      const categories =
        await this.categoriesServices.getCategoriesFromEvents(eventId);

      if (!categories.length)
        return new Response<null>(false, null, ['Event not found']);

      const categoriesToAdd = categoriesInputModels.filter(
        (category) => !categories.find((cat) => cat.name === category.name),
      );

      if (!categoriesToAdd.length)
        return new Response<null>(false, null, ['No category to add']);

      const resp = await this.categoriesServices.addCategoriesToEvent(
        eventId,
        categoriesToAdd,
      );

      return new Response(true, resp, []);
    } catch (error) {
      if (error instanceof Error) {
        return new Response<null>(false, null, [error.message]);
      }
      return new Response<null>(false, null, ['Error on category addition']);
    }
  }

  async remove(input: CategoryModifierInput): Promise<Response<null>> {
    try {
      const { eventId, categories: categoriesInput } = input;
      if (!eventId || !categoriesInput)
        return new Response<null>(false, null, [
          'eventId and categoryId are both required',
        ]);
      const categories =
        await this.categoriesServices.getCategoriesFromEvents(eventId);

      if (!categories.length)
        return new Response<null>(false, null, ['Event not found']);

      const categoriesToRemove = categoriesInput
        .map((category) => new Category(category, new Notifications()))
        .filter((category) =>
          categories.find((cat) => cat.name === category.name),
        );

      if (!categoriesToRemove.length)
        return new Response<null>(false, null, ['No category to remove']);

      await this.categoriesServices.removeCategoriesFromEvent(
        eventId,
        categoriesToRemove,
      );

      return new Response(true, null, []);
    } catch (error) {
      if (error instanceof Error) {
        return new Response<null>(false, null, [error.message]);
      }
      return new Response<null>(false, null, ['Error on category removel']);
    }
  }
}
