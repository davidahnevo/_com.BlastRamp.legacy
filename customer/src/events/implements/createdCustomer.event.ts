import { ICreatCustomerDto } from '../../interfaces/createCustomer-dto.interface';
export class CustomerCreatedEvent {
    constructor(
        public readonly  dtoCustomer :ICreatCustomerDto
    ) {}
}
    
