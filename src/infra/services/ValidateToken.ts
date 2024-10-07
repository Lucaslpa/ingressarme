import admin from 'firebase-admin';
import { IValidateToken } from '../interfaces/IValidateToken';

export class ValidateToken implements IValidateToken {
  public async execute(token: string): Promise<boolean> {
    try {
      await admin.auth().verifyIdToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }
}
