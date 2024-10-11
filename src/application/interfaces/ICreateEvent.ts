import { CreateEventInput } from '../dto/CreateEventInput';
import { Response } from '../dto';
export abstract class ICreateEvent {
  abstract execute(
    input: CreateEventInput,
  ): Promise<Response<{ eventId: string }>>;
}
