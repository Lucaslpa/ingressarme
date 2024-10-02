import { User } from 'src/business/models/User';
import { IServices } from 'src/business/services/IServices';
import admin, { FirebaseError } from 'firebase-admin';
import { Injectable } from '@nestjs/common';

export class UserServices implements IServices<User> {
  async add(entity: User): Promise<User> {
    const userRecord = await admin
      .auth()
      .createUser({
        email: entity.email,
        password: entity.password,
        displayName: entity.name,
      })
      .catch((error: FirebaseError) => {
        return new Error(error.message);
      });

    if (userRecord instanceof Error) throw userRecord;

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
