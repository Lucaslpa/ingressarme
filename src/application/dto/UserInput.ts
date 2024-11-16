import { ERole } from 'src/business/interfaces/ERole';

export class UserInput {
  constructor(
    public readonly id: string = '',
    public readonly name: string = '',
    public readonly email: string = '',
    public readonly password: string = '',
    public readonly role: ERole = '' as ERole,
  ) {}
}
