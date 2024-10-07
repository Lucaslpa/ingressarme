import admin from 'firebase-admin';

export abstract class ITokenIsValid {
  abstract execute(token: string): Promise<boolean>;
}
