import { User } from '../../models';
import { Validator } from '../Validator';

export abstract class IUserValidator extends Validator<User> {}
