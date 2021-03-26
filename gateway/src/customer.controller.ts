import { Controller, Post, Put, Get, Body, Req, Inject, HttpStatus, HttpException, Param, } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';

import { Authorization } from './decorators/authorization.decorator';
import { IAuthorizedRequest } from './interfaces/common/authorized-request.interface';
import { IServiceCustomerCreateResponse } from './interfaces/customer/service-customer-create-response.interface';
import { IServiceCustomerGetResponse } from './interfaces/customer/service-customer-get-response.interface';



import { CreateCustomerDto } from './interfaces/customer/dto/create-customer.dto';
import { CreateCustomerResponseDto } from './interfaces/customer/dto/create-customer-response.dto';
import { GetCustomerResponseDto } from './interfaces/customer/dto/get-customer-response.dto';



@Controller('customers')
@ApiTags('customers')
export class CustomerController {
  constructor(
    @Inject('TOKEN_SERVICE') private readonly tokenServiceClient: ClientProxy,
    @Inject('CUSTOMER_SERVICE') private readonly customerServiceClient: ClientProxy,
  ) {}


  @Post()
  @Authorization(true)
  @ApiCreatedResponse({
    type: CreateCustomerResponseDto,
  })
  public async createCustomer(
    @Body() userRequest: CreateCustomerDto,
  ): Promise<CreateCustomerResponseDto> {

    const createCreateResponse: IServiceCustomerCreateResponse = await this.customerServiceClient
      .send('create-customer', userRequest)
      .toPromise();
    if (createCreateResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(
        {
          message: createCreateResponse.message,
          data: null,
          errors: createCreateResponse.errors,
        },
        createCreateResponse.status,
      );
    }
    return {
        message: createCreateResponse.message,
        data: createCreateResponse.customer,  
        errors: null,
      };
  }


  @Get()
  @Authorization(true)
  @ApiOkResponse({
    type: GetCustomerResponseDto,
  })
  public async GetCustomer(): Promise<GetCustomerResponseDto> {

      const getResponse: IServiceCustomerGetResponse = await this.customerServiceClient
      .send('getall-customer',"")
      .toPromise();


    if (getResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: getResponse.message,
          data: null,
          errors: getResponse.errors,
        },
        getResponse.status,
      );
    }
    return {
        message: getResponse.message,
        data: getResponse.customer,  
        errors: null,
      };
  }

}
