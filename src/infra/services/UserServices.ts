import { User, IServices, Notifications } from '@business';
import admin, { FirebaseError } from 'firebase-admin';

export class UserServices implements IServices<User> {
  getAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  async add(entity: User): Promise<User> {
    const userRecord = await admin
      .auth()
      .createUser({
        email: entity.email,
        password: entity.password,
        displayName: entity.name,
      })
      .catch((error: FirebaseError) => {
        return new Error(
          'Signup user: ' + error.message || 'Error on signup user',
        );
      });
    if (userRecord instanceof Error) throw userRecord;
    const responseClaim = await admin
      .auth()
      .setCustomUserClaims(userRecord.uid, {
        role: entity.role,
      })
      .catch(
        (error: FirebaseError) =>
          new Error(
            'Create user claim: ' + error.message ||
              'Error on set custom claims',
          ),
      );
    if (responseClaim instanceof Error) throw responseClaim;
    const user = new User(
      entity.name,
      entity.email,
      entity.password,
      entity.role,
      new Notifications(),
      userRecord.uid,
    );
    return user;
  }

  async update(entity: User): Promise<User> {
    const userRecord = await admin
      .auth()
      .updateUser(entity.id, {
        email: entity.email,
        password: entity.password,
        displayName: entity.name,
      })
      .catch(
        (error: FirebaseError) =>
          new Error(
            'Update user: ' + error.message || 'Error on udpate user data',
          ),
      );
    if (userRecord instanceof Error) throw userRecord;
    const user = new User(
      entity.name,
      entity.email,
      entity.password,
      entity.role,
      new Notifications(),
    );
    return user;
  }

  async delete(id: string): Promise<void> {
    const deleteUser = await admin
      .auth()
      .deleteUser(id)
      .catch(
        (error) =>
          new Error('Delete user: ' + error.message || 'Error on delete user'),
      );
    if (deleteUser instanceof Error) throw deleteUser;
  }

  async getById(id: string): Promise<User> {
    const userRecord = await admin
      .auth()
      .getUser(id)
      .catch(
        (error: FirebaseError) =>
          new Error('Get user: ' + error.message || 'Error on get user data'),
      );
    if (userRecord instanceof Error) throw userRecord;
    const user = new User(
      userRecord.displayName || '',
      userRecord.email || '',
      '',
      userRecord.customClaims?.role || 'user',
      new Notifications(),
      userRecord.uid,
    );
    return user;
  }
}
