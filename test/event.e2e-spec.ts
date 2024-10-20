import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from '../src/modules/User/UserModule';
import { CreateEventInput, UserInput, ExludeEventInput } from '@application';
import { ECategories, ERole, ETicketTier } from '@business';
import { FirebaseModule } from '../src/modules/firebase.module';
import { ConfigModule } from '@nestjs/config';
import { ITokenIsValid, TokenIsValid } from '@infra';
import { EventModule } from '../src/modules';

class MockTokenIsValid implements ITokenIsValid {
  async execute(token: string): Promise<boolean> {
    return Promise.resolve(true);
  }
}

describe('UserModule (e2e)', () => {
  let app: INestApplication;
  let userId: string;
  let eventId: string;

  beforeAll(async () => {
    const mockTokenIsValid = new MockTokenIsValid();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env',
        }),
        FirebaseModule,
        EventModule,
        UserModule,
      ],
    })
      .overrideProvider(ITokenIsValid)
      .useValue(mockTokenIsValid)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should validate token using MockTokenIsValid', async () => {
    const tokenValidator = app.get<ITokenIsValid>(ITokenIsValid);
    const result = await tokenValidator.execute('some-token');
    expect(result).toBe(true);
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

  it('should create an event', async () => {
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
      userId: userId,
    };

    const response = await request(app.getHttpServer())
      .post('/event')
      .send(input);

    if (response.status !== 200) {
      console.error('erro criar evento:', response.body);
    }

    expect(response.status).toBe(200);
    eventId = response.body.data.eventId;
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

  it('should delete the created event', async () => {
    const input: ExludeEventInput = {
      eventId,
      userId,
    };

    const response = await request(app.getHttpServer())
      .delete('/event/' + eventId)
      .send(input);

    if (response.status !== 200) {
      console.error('erro ao excluir evento:', response.body, input);
    }

    expect(response.status).toBe(200);
  });

  // it('should delete the user', async () => {
  //   const response = await request(app.getHttpServer())
  //     .delete(`/user/exclude/${userId}`)
  //     .set('Authorization', 'Bearer token');

  //   if (response.status !== 200) {
  //     console.error('erro ao excluir usuario:', response.body);
  //   }

  //   expect(response.status).toBe(200);
  // });
});
