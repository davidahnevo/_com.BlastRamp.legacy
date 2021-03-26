import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { CustomerCreatedEvent } from '../events/implements/createdCustomer.event';
import { CreateCustomerQueryDBCommand } from '../commands/implements/createCustomerQueryDB.command';


@Injectable()
export class CustomerSagas {
  @Saga()
  customercreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$
      .pipe(
        ofType(CustomerCreatedEvent),
        delay(1000),
        map(event => {
          console.log("Customer-CustomerSagas-CreateCustomerQueryDBCommand"); 
          return new CreateCustomerQueryDBCommand(event.dtoCustomer);
        }),
      );
  }
}
