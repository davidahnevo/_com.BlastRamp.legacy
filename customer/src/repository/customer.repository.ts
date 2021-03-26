import { Injectable } from '@nestjs/common';
import { Customer } from '../models/customer.model';
import { Customer as CustomerEntity } from './entity/customer.entity';
import { CustomerQuery as CustomerQueryEntity } from './entity/customer.query.entity';
import { ICreatCustomerDto } from '../interfaces/createCustomer-dto.interface';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
@EntityRepository(CustomerEntity)
@EntityRepository(CustomerQueryEntity)
export class CustomerRepository {
    async create(dtocreatecustomer: ICreatCustomerDto): Promise<any> {
        
        await getRepository(CustomerEntity).save(dtocreatecustomer);
        const customerModel = new Customer (dtocreatecustomer);
        return customerModel;
      
    }

    

    async createdCustomerQueryDB(dtocreatecustomer: ICreatCustomerDto): Promise<any> {
        
        console.log("Customer-CustomerRepository-createdCustomerQueryDB"); 
        await getRepository(CustomerQueryEntity).save(dtocreatecustomer);
        const customerModel = new Customer (dtocreatecustomer);
        return customerModel;
      
    }


    async findOne(id : string): Promise<ICreatCustomerDto> {
       
        const result = await getRepository(CustomerEntity).find({ where: { rtlr_id: id } });
        //console.log("findone :", result[0]);
        return result[0];
        
      
    }
    async findAll(): Promise<any> {
        return getRepository(CustomerQueryEntity).find();
    }

    
}
