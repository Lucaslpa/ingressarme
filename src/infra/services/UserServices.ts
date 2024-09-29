import { User } from 'src/business/models/User';
import { IServices } from 'src/business/services/IServices';
import admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';
import { FirebaseError } from 'firebase-admin/lib/utils/error';

@Injectable()
export class UserServices implements IServices<User> {
  async add(entity: User): Promise<User> {
    try {
      const userRecord = await admin.auth().createUser({
        email: entity.email,
        password: entity.password,
        displayName: entity.name,
      });

      await admin.auth().setCustomUserClaims(userRecord.uid, {
        role: entity.role,
      });

      const user = new User(
        userRecord.uid,
        entity.name,
        entity.email,
        entity.password,
        entity.role,
      );

      return user;
    } catch (error) {
      throw new Error('Error on user creation');
    }
  }

  async update(entity: User): Promise<User> {
    const userRecord = await admin.auth().updateUser(entity.id, {
      email: entity.email,
      password: entity.password,
      displayName: entity.name,
    });

    await admin.auth().setCustomUserClaims(userRecord.uid, {
      role: entity.role,
    });

    const user = new User(
      userRecord.uid,
      entity.name,
      entity.email,
      entity.password,
      entity.role,
    );

    return user;
  }

  async delete(id: string): Promise<void> {
    return admin.auth().deleteUser(id);
  }
}
