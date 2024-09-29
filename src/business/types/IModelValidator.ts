import { Notifier } from 'src/business/entityNotification';

export interface IModelValidator {
  validate(model: Notifier): { isValid: boolean; message: string };
}
