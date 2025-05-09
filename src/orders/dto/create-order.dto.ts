import { Type } from 'class-transformer';
import { IsArray, ArrayMinSize, ValidateNested } from 'class-validator';
import { OrderItemDto } from './order-item.dto';

export enum OrderStatus {
  PENDING = 'PENDING',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export const OrderStatusList = [
  OrderStatus.CANCELLED,
  OrderStatus.DELIVERED,
  OrderStatus.PENDING,
];

export class CreateOrderDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  readonly items: OrderItemDto[];
}

// @IsNumber()
// @IsPositive()
// @Min(1)
// readonly totalAmount: number;

// @IsNumber()
// @IsPositive()
// @Min(1)
// readonly totalItems: number;

// @IsBoolean()
// @IsOptional()
// readonly paid: boolean = false;

// @IsEnum(OrderStatusList, {
//   message: `Posible status values are: ${JSON.stringify(OrderStatusList, null, 2)}`,
// })
// @IsOptional()
// readonly status?: OrderStatus = OrderStatus.PENDING;
