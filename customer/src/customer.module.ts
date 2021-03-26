import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { ConfigService } from './config.service';
import { Customer as CustomerEntity } from './repository/entity/customer.entity';
import { CustomerQuery as CustomerQueryEntity } from './repository/entity/customer.query.entity';

import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerRepository } from './repository/customer.repository';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { CustomerSagas } from './sagas/customer.sagas';
import { QueryHandlers } from './queries/handlers';


@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host:  process.env.DB_HOST || 'localhost',
      port:  parseInt(process.env.MYSQL_PORT),
      database: process.env.MYSQL_DATABASE,
      username: process.env.MYSQL_ROOT_USER, 
      password: process.env.MYSQL_ROOT_PASSWORD, 
      synchronize: true,
      logging: true,                
      entities: [
        CustomerEntity, 
        CustomerQueryEntity
      ],
    }),
    TypeOrmModule.forFeature([
      CustomerEntity,
      CustomerQueryEntity, 
    ]),


  ],
  controllers: [CustomerController],
  providers: [
    ConfigService,
    CustomerRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    CustomerSagas,
  ],
})
export class CustomerModule {}