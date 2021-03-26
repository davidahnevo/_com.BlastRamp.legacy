import { Get, Body, Controller, HttpStatus, Inject } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern, ClientProxy, Payload, Ctx, RmqContext, EventPattern } from '@nestjs/microservices';

import { ICreatCustomerDto } from './interfaces/createCustomer-dto.interface';
import { CreateCustomerCommand } from './commands/implements/createCustomer.command';
import { CustomerRepository } from './repository/customer.repository'
import { IServiceCustomerCreateResponse } from './interfaces/service-customer-create-response.interface';
import { IServiceCustomerGetResponse } from './interfaces/service-customer-get-response.interface';
import { ICustomer } from './interfaces/customer.interface';
import { GetCustomersQuery } from './queries/implements';

@Controller('customers')
export class CustomerController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly customerRepository : CustomerRepository,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern('create-customer')
  public async createCustomer(@Payload() dtoCreatecustomer : ICreatCustomerDto, @Ctx() context: RmqContext): Promise<any> {
    let result: IServiceCustomerCreateResponse;

    console.log("Customer-controller-create-customer"); 
    
    let result_command= await this.commandBus.execute(new CreateCustomerCommand(dtoCreatecustomer));
    console.log("result commmand: " , result_command);
    
    let result_find = await this.customerRepository.findOne(dtoCreatecustomer.rtlr_id);

    console.log(result_find);
    console.log(`customerRepository : ${result_find}`); 
    
    let resultFind : ICustomer; 
    if (result_find != undefined ) {
      resultFind = {
        rtlr_id: (await result_find).rtlr_id,
        rtlr_code: (await result_find).rtlr_code,    
        rtlr_pwd: (await result_find).rtlr_pwd,
        name: (await result_find).name,
      }; 

      result = {
        status : HttpStatus.CREATED,
        message : "successfully customer is created",
        customer : resultFind,
        errors : null,
      };
    } else {
      result = {
        status : HttpStatus.NOT_ACCEPTABLE,
        message : "customer is not created",
        customer : null,
        errors : null,
      };
    } 
    

    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);

    return result; 
  }


  @MessagePattern('getall-customer')
  async findAll(@Ctx() context: RmqContext): Promise<IServiceCustomerGetResponse> {
    let result: IServiceCustomerGetResponse;

    const result_customers = this.queryBus.execute(new GetCustomersQuery());

    let resultFinds= []; 
    let resultFind : ICustomer;

    if (result_customers != undefined ) {
      for (let result_customer of await result_customers) {
        resultFind = { 
        
          rtlr_id : result_customer.rtlr_id,
          rtlr_code :  result_customer.rtlr_code,    
          rtlr_pwd : result_customer.rtlr_pwd,
          name : result_customer.name,
        };
        resultFinds.push(resultFind);        

      }
      
      result = {
        status : HttpStatus.OK,
        message : "successfully  Get Customer ",
        customer : resultFinds,
        errors : null,
      };

    } else {
      result = {
        status : HttpStatus.NOT_ACCEPTABLE,
        message : "No Customer",
        customer : null,
        errors : null,
      };
    } 

  

    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);

    return result; 


  }
}
