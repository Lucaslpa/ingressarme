import { ERole } from '../types/ERole';
import { Entity } from './Entity';

export class User extends Entity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: ERole,
  ) {
    super();
  }
}
