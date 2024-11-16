import { UUID } from 'crypto';
import { TicketViewer } from './TicketViewer';

export class EventViewer {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly startDate: string,
    readonly endDate: string,
    readonly bannerImg: string,
    readonly iconImg: string,
    readonly description: string,
    readonly address: string,
    readonly latitude: number,
    readonly longitude: number,
    readonly categories: string[],
    readonly tickets: TicketViewer[],
  ) {}
}
