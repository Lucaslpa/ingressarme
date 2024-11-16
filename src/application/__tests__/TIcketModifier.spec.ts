import { ETicketTier, Notifications, TicketValidator } from '@business';
import { servicesEventStub } from './stubs/servicesEventStub';
import {
  CreateTicketInput,
  RemoveTicketInput,
  UpdateTicketInput,
} from '../dto/TicketModifierInput';
import { servicesTicketStub } from './stubs/servicesTicketStub';
import { TickerModifier } from '../Event/TicketModifier';
import { servicesTierStub } from './stubs/servicesTierStub';

describe('TicketModifier', () => {
  it('should add a new ticket to event', async () => {
    const input = new CreateTicketInput(
      '1',
      'descricao ticket 1',
      200,
      10,
      'RS',
      ETicketTier.elite,
    );

    const response = await new TickerModifier(
      servicesEventStub,
      servicesTicketStub,
      new TicketValidator(),
      servicesTierStub,
      new Notifications(),
    ).add(input);
    expect(response.isSuccess).toBe(true);
  });

  it('should failure when add ticket receives a invalid input', async () => {
    const input = new CreateTicketInput(
      '1',
      'descricao ticket 1',
      200,
      0,
      'RS',
      ETicketTier.deluxe,
    );

    const response = await new TickerModifier(
      servicesEventStub,
      servicesTicketStub,
      new TicketValidator(),
      servicesTierStub,
      new Notifications(),
    ).add(input);

    expect(response.isSuccess).toBe(false);

    expect(response.errors).toEqual([
      'quantity: Ticket quantity must be at least 10',
    ]);
  });

  it('should update a  ticket from event', async () => {
    const input = new UpdateTicketInput('1', 'nova descricao para o ticket');

    const response = await new TickerModifier(
      servicesEventStub,
      servicesTicketStub,
      new TicketValidator(),
      servicesTierStub,
      new Notifications(),
    ).update(input);

    expect(response.isSuccess).toBe(true);
  });

  it('should failure when update ticket receives a invalid input', async () => {
    const input = new UpdateTicketInput('1', 'n');

    const response = await new TickerModifier(
      servicesEventStub,
      servicesTicketStub,
      new TicketValidator(),
      servicesTierStub,
      new Notifications(),
    ).update(input);

    expect(response.isSuccess).toBe(false);

    expect(response.errors).toEqual([
      'description: Description must be at least 10 characters long',
    ]);
  });

  it('should remove a ticket from event', async () => {
    const input = new RemoveTicketInput('1');

    const response = await new TickerModifier(
      servicesEventStub,
      servicesTicketStub,
      new TicketValidator(),
      servicesTierStub,
      new Notifications(),
    ).remove(input);

    expect(response.isSuccess).toBe(true);
  });

  it('should failure when remove ticket receives a invalid input', async () => {
    const input = new RemoveTicketInput('');

    const response = await new TickerModifier(
      servicesEventStub,
      servicesTicketStub,
      new TicketValidator(),
      servicesTierStub,
      new Notifications(),
    ).remove(input);

    expect(response.isSuccess).toBe(false);

    expect(response.errors).toEqual(['ticketId is required']);
  });
});
