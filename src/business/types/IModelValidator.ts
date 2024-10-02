import { Notifier } from 'src/business/entityNotification';

export abstract class IModelValidator {
  abstract validate(model: Notifier): { isValid: boolean; errors: string[] };
}
