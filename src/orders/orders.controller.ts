import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  ParseUUIDPipe,
  Query,
  Patch,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { NATS_SERVICE } from 'src/config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationOrdersDto } from 'src/orders/dto/pagination-orders.dto';
import { ChangeOrderStatusDto } from './dto/change-status-orden.dto';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send('createOrder', createOrderDto).pipe(
      catchError((err) => {
        throw new RpcException(err as object);
      }),
    );
  }

  @Get()
  findAllOrders(@Query() paginationOrdersDto: PaginationOrdersDto) {
    return this.client.send('findAllOrders', paginationOrdersDto);
  }

  @Get(':id')
  findOneOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('findOneOrder', id).pipe(
      catchError((err) => {
        throw new RpcException(err as object);
      }),
    );
  }

  @Patch(':id')
  changeOrderStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() changeOrdenStatusDto: ChangeOrderStatusDto,
  ) {
    return this.client
      .send('changeOrderStatus', {
        id,
        ...changeOrdenStatusDto,
      })
      .pipe(
        catchError((err) => {
          throw new RpcException(err as object);
        }),
      );
  }
}
