import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatus, OrderStatusList } from 'src/orders/dto/create-order.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

export class PaginationOrdersDto extends PaginationDto {
  @IsEnum(OrderStatusList, {
    message: `Order status posible values are: ${JSON.stringify(OrderStatusList)}`,
  })
  @IsOptional()
  readonly status?: OrderStatus;
}
