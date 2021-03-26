import { ICreatCustomerDto } from '../../interfaces/createCustomer-dto.interface';
export class CreateCustomerCommand {
    constructor(
      public readonly  dtoCustomer :ICreatCustomerDto
    ) {}
  }
  