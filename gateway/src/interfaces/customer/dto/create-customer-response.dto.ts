import { ApiProperty } from '@nestjs/swagger';
import { ICustomer } from '../customer.interface';

export class CreateCustomerResponseDto {
  @ApiProperty({ example: 'customer_created_success' })
  message: string;
  @ApiProperty({ example: null, nullable: true, type: 'null' })
  data: ICustomer | null;
  @ApiProperty({ example: null, nullable: true })
  errors: { [key: string]: any };
}
