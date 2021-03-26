import { AggregateRoot } from '@nestjs/cqrs';
import { CustomerCreatedEvent } from '../events/implements/createdCustomer.event';

import { ICreatCustomerDto } from '../interfaces/createCustomer-dto.interface';

export class Customer extends AggregateRoot {
  constructor(private readonly dtocreatecustomer: ICreatCustomerDto) {
    super();
  }

  createCustomer(dtocreatecustomer: ICreatCustomerDto) {
    // logic

    console.log("Customer-CustomerModel-CustomerCreatedEvent"); 
    this.apply(new CustomerCreatedEvent(dtocreatecustomer));
  }

}
