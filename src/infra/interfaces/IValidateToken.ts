import admin from 'firebase-admin';

export abstract class IValidateToken {
  abstract execute(token: string): Promise<boolean>;
}
