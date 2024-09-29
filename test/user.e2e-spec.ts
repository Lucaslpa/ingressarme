import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from './../src/modules/User/UserModule';
import { UserInput } from './../src/application/dto/UserInput';

describe('UserModule (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a user', () => {
    const input: UserInput = {
      name: 'joão',
      email: 'joao@gmail.com',
      password: '12345',
      role: 1,
      id: '',
    };
    return request(app.getHttpServer())
      .post('/signup')
      .send(input)
      .expect(200)
      .expect('Hello World!');
  });
});
