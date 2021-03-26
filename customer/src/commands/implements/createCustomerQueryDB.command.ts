import { ICreatCustomerDto } from '../../interfaces/createCustomer-dto.interface';

export class CreateCustomerQueryDBCommand {
    constructor(
        public readonly  dtoCustomer :ICreatCustomerDto
      ) {}
  }
  