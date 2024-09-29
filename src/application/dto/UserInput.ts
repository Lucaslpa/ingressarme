import { ERole } from 'src/business/types/ERole';

export class UserInput {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: ERole,
    public id: string,
  ) {}
}
