import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from './../src/modules/User/UserModule';
import { UserInput } from '@application';
import { ERole } from '@business';
import { FirebaseModule } from './../src/firebase.module';
import { ConfigModule } from '@nestjs/config';

describe('UserModule (e2e)', () => {
  let app: INestApplication;
  let userId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env',
        }),
        UserModule,
        FirebaseModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a user', async () => {
    const input: UserInput = {
      name: 'joaozinho',
      email: 'joa2323o@gmail.com',
      password: '12345678',
      role: ERole.enterprise,
      id: '',
    };
    const response = await request(app.getHttpServer())
      .post('/user/signup')
      .send(input);
    expect(response.status).toBe(200);
    userId = response.body.data.id;
  });

  it('should fail to create a user with the same email', async () => {
    const input: UserInput = {
      name: 'joão',
      email: 'joa2323o@gmail.com',
      password: '12345',
      role: ERole.enterprise,
      id: '',
    };
    const response = await request(app.getHttpServer())
      .post('/user/signup')
      .send(input);
    expect(response.status).toBe(400);
  });

  it('should fail to create a user with the wrong email', async () => {
    const input: UserInput = {
      name: 'joão',
      email: 'joa2323o@',
      password: '12345',
      role: ERole.enterprise,
      id: '',
    };
    const response = await request(app.getHttpServer())
      .post('/user/signup')
      .send(input);
    expect(response.status).toBe(400);
  });

  it('should update the user', async () => {
    const updateInput = {
      id: userId,
      name: 'joaozinho updated',
      email: 'joa2323o_updated@gmail.com',
    };
    const response = await request(app.getHttpServer())
      .put(`/user/update/${userId}`)
      .send(updateInput);
    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe(updateInput.name);
    expect(response.body.data.email).toBe(updateInput.email);
  });

  it('should delete the user', async () => {
    const response = await request(app.getHttpServer()).delete(
      `/user/exclude/${userId}`,
    );
    expect(response.status).toBe(200);
  });
});
