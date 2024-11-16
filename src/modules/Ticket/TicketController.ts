import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import {
  Response,
  IAcquireTicket,
  AcquireTicketInput,
  RefundTicketInput,
  IRefundTicket,
} from '@application';
import { HttpResponseInterceptor } from '../../utils/HttpResponseInterceptor';

@UseInterceptors(HttpResponseInterceptor)
@Controller('ticket')
export class TicketController {
  constructor(
    private readonly acquireTicket: IAcquireTicket,
    private readonly refundticket: IRefundTicket,
  ) {}

  @Post()
  async create(@Body() input: AcquireTicketInput) {
    const response = await this.acquireTicket.execute(input);
    return response;
  }

  @Put('/:userId')
  async addCategory(
    @Param('userId') userId: string,
    @Body() input: RefundTicketInput,
  ) {
    const response = await this.refundticket.execute(input);
    return response;
  }
}
