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
import { ORDER_SERVICE } from 'src/config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationOrdersDto } from 'src/orders/dto/pagination-orders.dto';
import { ChangeOrderStatusDto } from './dto/change-status-orden.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy,
  ) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('createOrder', createOrderDto).pipe(
      catchError((err) => {
        throw new RpcException(err as object);
      }),
    );
  }

  @Get()
  findAllOrders(@Query() paginationOrdersDto: PaginationOrdersDto) {
    return this.ordersClient.send('findAllOrders', paginationOrdersDto);
  }

  @Get(':id')
  findOneOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersClient.send('findOneOrder', id).pipe(
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
    return this.ordersClient
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
