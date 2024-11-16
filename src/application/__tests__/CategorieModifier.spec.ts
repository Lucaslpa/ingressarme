import { CategorieModifierInput } from '../dto';
import { CategorieModifier } from '../Event/CategoryModifier';
import { servicesEventStub } from './stubs/servicesEventStub';
import { servicesCategoriesStub } from './stubs/servicesCategoriesStub';

describe('CreateEvent', () => {
  it('should add a new category to event', async () => {
    const input = new CategorieModifierInput('1', '1');

    const response = await new CategorieModifier(
      servicesEventStub,
      servicesCategoriesStub,
    ).add(input);

    expect(response.isSuccess).toBe(true);
  });

  it('should failure when add categorie receives a invalid input', async () => {
    const input = new CategorieModifierInput('', '');

    const response = await new CategorieModifier(
      servicesEventStub,
      servicesCategoriesStub,
    ).add(input);

    expect(response.isSuccess).toBe(false);

    expect(response.errors).toEqual([
      'eventId and categoryId are both required',
    ]);
  });

  it('should remove a category from event', async () => {
    const input = new CategorieModifierInput('1', '1');

    const response = await new CategorieModifier(
      servicesEventStub,
      servicesCategoriesStub,
    ).remove(input);

    expect(response.isSuccess).toBe(true);
  });

  it('should failure when remove categorie receives a invalid input', async () => {
    const input = new CategorieModifierInput('', '');

    const response = await new CategorieModifier(
      servicesEventStub,
      servicesCategoriesStub,
    ).remove(input);

    expect(response.isSuccess).toBe(false);

    expect(response.errors).toEqual([
      'eventId and categoryId are both required',
    ]);
  });
});
