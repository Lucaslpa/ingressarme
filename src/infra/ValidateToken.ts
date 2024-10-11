import admin from 'firebase-admin';
import { ITokenIsValid } from './interfaces/IValidateToken';

export class TokenIsValid implements ITokenIsValid {
  public async execute(token: string): Promise<boolean> {
    try {
      await admin.auth().verifyIdToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }
}
