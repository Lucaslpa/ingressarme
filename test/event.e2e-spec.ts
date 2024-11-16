import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from '../src/modules/User/UserModule';
import {
  CreateEventInput,
  UserInput,
  ExludeEventInput,
  UpdateEventInput,
  CategoryModifier,
  CategoryModifierInput,
  CreateTicketInput,
  UpdateTicketInput,
  RemoveTicketInput,
} from '@application';
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
  let ticketId: string;

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

  it('should  update the created event', async () => {
    const input: UpdateEventInput = {
      userId,
      eventId,
      description: 'A great music festival with top artists from Brazil.',
    };

    const response = await request(app.getHttpServer())
      .put('/event/' + eventId)
      .send(input);

    expect(response.status).toBe(200);
  });

  it('should  add a new category to event', async () => {
    const input: CategoryModifierInput = {
      eventId,
      categories: [ECategories.CLASSIC, ECategories.OKTOBERFEST],
    };

    const response = await request(app.getHttpServer())
      .post('/event/category')
      .send(input);

    if (response.status !== 200) {
      console.error('erro ao adicionar categoria:', response.body);
    }

    expect(response.status).toBe(200);
  });

  it('should remove  category from event', async () => {
    const input: CategoryModifierInput = {
      eventId,
      categories: [ECategories.CLASSIC, ECategories.OKTOBERFEST],
    };

    const response = await request(app.getHttpServer())
      .delete('/event/category')
      .send(input);

    if (response.status !== 200) {
      console.error('erro ao remover categoria:', response.body);
    }

    expect(response.status).toBe(200);
  });

  it('should add a ticket to event', async () => {
    const input: CreateTicketInput = {
      eventId: 'a43bc22c-f10b-4b17-8559-168c20b72f0c',
      description: 'General Admission',
      price: 100.0,
      quantity: 500,
      tier: ETicketTier.standard,
      currency: 'USD',
    };

    const response = await request(app.getHttpServer())
      .post('/event/ticket')
      .send(input);

    if (response.status !== 200) {
      console.error('erro ao adicionar ticket:', response.body);
    }
    expect(response.status).toBe(200);
    ticketId = response.body.data.ticketId;
  });

  it('should update the ticket', async () => {
    const input: UpdateTicketInput = {
      ticketId: '8ddcce6c-6089-4311-9085-fcd33909c5da',
      quantity: 20,
      tier: ETicketTier.ultimate,
    };

    const response = await request(app.getHttpServer())
      .put('/event/ticket')
      .send(input);

    if (response.status !== 200) {
      console.error('erro ao atualizar ticket:', response.body);
    }

    expect(response.status).toBe(200);
  });

  it('should delete the ticket', async () => {
    const input: RemoveTicketInput = {
      ticketId,
    };

    const response = await request(app.getHttpServer())
      .delete('/event/ticket/')
      .send(input);

    if (response.status !== 200) {
      console.error('erro ao excluir ticket:', response.body);
    }

    expect(response.status).toBe(200);
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

  it('should delete the user', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/user/exclude/${userId}`)
      .set('Authorization', 'Bearer token');

    if (response.status !== 200) {
      console.error('erro ao excluir usuario:', response.body);
    }

    expect(response.status).toBe(200);
  });
});
