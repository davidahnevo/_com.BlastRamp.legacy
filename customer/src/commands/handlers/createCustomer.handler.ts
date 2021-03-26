import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CustomerRepository } from '../../repository/customer.repository';
import { CreateCustomerCommand } from '../implements/createCustomer.command';

import { ICreatCustomerDto } from '../../interfaces/createCustomer-dto.interface';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler implements ICommandHandler<CreateCustomerCommand> {
  constructor(
    private readonly repository: CustomerRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateCustomerCommand) : Promise<ICreatCustomerDto> {
  
    console.log("Customer-createCustomerCommandHandler"); 
    const customer = this.publisher.mergeObjectContext(
      await this.repository.create(command.dtoCustomer),
    );
   
    customer.createCustomer(command.dtoCustomer);
    customer.commit();

    return await this.repository.findOne(command.dtoCustomer.rtlr_code); //double check???? 
  }
}
