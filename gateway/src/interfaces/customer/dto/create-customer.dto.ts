import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({
    example: '001',
  })
  rtlr_id: string;
  @ApiProperty({
    uniqueItems: true,  
    minLength: 6,
    example: 'evolution-zzz',
  })
  rtlr_code: string;
  @ApiProperty({
    example: 'dklfjsldi',
  })
  rtlr_pwd: string; 
  @ApiProperty({
    uniqueItems: true,  
    minLength: 2,
    example: 'evonorthtech',
  }) 
  name: string;
}

  