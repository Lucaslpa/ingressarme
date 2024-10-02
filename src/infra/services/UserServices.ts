import { User } from 'src/business/models/User';
import { IServices } from 'src/business/services/IServices';
import admin, { FirebaseError } from 'firebase-admin';

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
        return new Error('Signup user: ' + error.message);
      });

    if (userRecord instanceof Error) throw userRecord;

    const responseClaim = await admin
      .auth()
      .setCustomUserClaims(userRecord.uid + 10, {
        role: entity.role,
      })
      .catch((error) => {
        return new Error(
          'Create user claim: ' + error.message || 'Error on set custom claims',
        );
      });

    if (responseClaim instanceof Error) throw responseClaim;

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
