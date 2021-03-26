import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CustomerRepository } from '../../repository/customer.repository';
import { GetCustomersQuery } from '../implements/index';

@QueryHandler(GetCustomersQuery)
export class GetCustomersHandler implements IQueryHandler<GetCustomersQuery> {
  constructor(private readonly repository: CustomerRepository) {}

  async execute(query: GetCustomersQuery) {
 
    return this.repository.findAll();
  }
}
