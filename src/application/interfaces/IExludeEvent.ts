import { Response } from '../dto';
import { ExludeEventInput } from '../dto/ExludeEventInput';

export abstract class IExcludeEvent {
  abstract execute(
    input: ExludeEventInput,
  ): Promise<Response<{ eventId: string }>>;
}
