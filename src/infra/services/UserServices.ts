import { User } from 'src/business/models/User';
import { IServices } from 'src/business/services/IServices';
import admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserServices implements IServices<User> {
  async add(entity: User): Promise<User> {
    return admin
      .auth()
      .createUser({
        email: entity.email,
        password: entity.password,
        displayName: entity.name,
      })
      .then((userRecord) => {
        return entity;
      })
      .catch((error) => {
        throw error;
      });
  }

  async update(entity: User): Promise<User> {
    return admin
      .auth()
      .updateUser(entity.id.toString(), {
        email: entity.email,
        displayName: entity.name,
      })
      .then((userRecord) => {
        return entity;
      });
  }

  async delete(id: string): Promise<void> {
    return admin.auth().deleteUser(id);
  }
}
