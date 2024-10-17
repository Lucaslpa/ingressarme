import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { FirebaseModule } from '../src/modules/firebase.module';
import { ConfigModule } from '@nestjs/config';
import { EventModule, UserModule } from '../src/modules';
import { CreateEvent, UserInput, CreateEventInput } from '@application';
import { ECategories, ERole, ETicketTier } from '@business';
import { ITokenIsValid, TokenIsValid } from '@infra';

class mockTokenIsValid implements ITokenIsValid {
  execute(token: string): Promise<boolean> {
    return Promise.resolve(true);
  }
}

describe('EventModule (e2e)', () => {
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
        EventModule,
      ],
    }).compile();
    jest
      .spyOn(mockTokenIsValid.prototype, 'execute')
      .mockImplementation(() => Promise.resolve(false));
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a user', async () => {
    jest
      .spyOn(mockTokenIsValid.prototype, 'execute')
      .mockImplementation(() => Promise.resolve(false));

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

  it.only('should create an event', async () => {
    jest
      .spyOn(mockTokenIsValid.prototype, 'execute')
      .mockImplementation(() => Promise.resolve(false));

    const input: CreateEventInput = {
      name: 'Music Festival 2024',
      description:
        'A great music festival with top artists from around the world.',
      startDate: '2024-11-15T18:00:00Z',
      endDate: '2024-11-18T23:59:00Z',
      address: '123 Main St, Cityville',
      longitude: -122.4194,
      latitude: 37.7749,
      ticketInfos: [
        {
          quantity: 500,
          price: 100.0,
          description: 'General Admission',
          tier: ETicketTier.free,
          currency: 'USD',
        },
        {
          quantity: 100,
          price: 250.0,
          description: 'VIP Admission',
          tier: ETicketTier.vip,
          currency: 'USD',
        },
      ],
      iconImg: 'https://example.com/icon.png',
      bannerImg: 'https://example.com/banner.png',
      categories: [ECategories.ANIME, ECategories.FUNK],
      userId: 'cP8MDvU2sWfBbJWDCCay85BKd552',
    };

    const response = await request(app.getHttpServer())
      .post('/event')
      .send(input);
    console.log(response.body);
    expect(response.status).toBe(200);
  });

  it('should  not create an event when user is not found', async () => {
    const input: CreateEventInput = {
      name: 'Music Festival 2024',
      description:
        'A great music festival with top artists from around the world.',
      startDate: '2024-11-15T18:00:00',
      endDate: '2024-11-18T23:59:00',
      address: '123 Main St, Cityville',
      longitude: -122.4194,
      latitude: 37.7749,
      ticketInfos: [
        {
          quantity: 500,
          price: 100.0,
          description: 'General Admission',
          tier: ETicketTier.free,
          currency: 'USD',
        },
        {
          quantity: 100,
          price: 250.0,
          description: 'VIP Admission',
          tier: ETicketTier.vip,
          currency: 'USD',
        },
      ],
      iconImg: 'https://example.com/icon.png',
      bannerImg: 'https://example.com/banner.png',
      categories: [ECategories.ANIME, ECategories.FUNK],
      userId: 'fake user id',
    };

    const response = await request(app.getHttpServer())
      .post('/event')
      .send(input);

    expect(response.status).toBe(400);
  });

  it('should delete the user', async () => {
    jest
      .spyOn(mockTokenIsValid.prototype, 'execute')
      .mockImplementation(() => Promise.resolve(false));

    const response = await request(app.getHttpServer())
      .delete(`/user/exclude/${userId}`)
      .set('Authorization', 'Bearer token');
    expect(response.status).toBe(200);
  });
});
