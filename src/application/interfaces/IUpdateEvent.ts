import { MEvent } from '@business';
import { Response } from '../dto';
import { UpdateEventInput } from '../dto/UpdateEventInput';
import { EventViewer } from '../dto/EventViewer';

export abstract class IUpdateEvent {
  abstract execute(
    input: UpdateEventInput,
  ): Promise<Response<EventViewer | null>>;
}
