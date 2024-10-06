import { ERole } from 'src/business/interfaces/ERole';

export class UserOutput {
  constructor(
    public id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly role: ERole,
  ) {}
}
