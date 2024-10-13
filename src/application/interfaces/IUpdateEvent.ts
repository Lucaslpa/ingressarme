import { Response } from '../dto';
import { UpdateEventInput } from '../dto/UpdateEventInput';

export abstract class IUpdateEvent {
  abstract execute(
    input: UpdateEventInput,
  ): Promise<Response<{ eventId: string }>>;
}
