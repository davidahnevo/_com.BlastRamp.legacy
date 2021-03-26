import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CustomerRepository } from '../../repository/customer.repository';
import { CreateCustomerQueryDBCommand } from '../implements/createCustomerQueryDB.command';

@CommandHandler(CreateCustomerQueryDBCommand)
export class CreateCustomerQueryDBHandler
  implements ICommandHandler<CreateCustomerQueryDBCommand> {
  constructor(
    private readonly repository: CustomerRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateCustomerQueryDBCommand) {

    console.log("Customer-CreateCustomerQueryDBCommand-createdCustomerQueryDB"); 
    const customer = this.publisher.mergeObjectContext(
        await this.repository.createdCustomerQueryDB(command.dtoCustomer),
      );
     
      customer.commit();
  }
}
