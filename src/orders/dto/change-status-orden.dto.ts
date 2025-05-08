import { IsEnum } from 'class-validator';
import { OrderStatus, OrderStatusList } from './create-order.dto';

export class ChangeOrderStatusDto {
  @IsEnum(OrderStatusList, {
    message: `Status must be one of the following values: ${JSON.stringify(OrderStatusList)}`,
  })
  readonly status: OrderStatus;
}
