import { Payment } from '../../models';
import { Validator } from '../Validator';

export abstract class IPaymentValidator extends Validator<Payment> {}
