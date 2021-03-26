import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
 
import { CustomerCreatedEvent } from '../implements/createdCustomer.event';

@EventsHandler(CustomerCreatedEvent)
export class CustomerCreatedHandler
  implements IEventHandler<CustomerCreatedEvent> {
  handle(event: CustomerCreatedEvent) {
   
    console.log("CustomerCreatedHandler- CustomerCreatedEvent ");

  }
}