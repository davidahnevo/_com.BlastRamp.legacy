import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ClientProxyFactory } from '@nestjs/microservices';

import { UsersController } from './users.controller';

import { AuthGuard } from './services/guards/authorization.guard';
import { PermissionGuard } from './services/guards/permission.guard';

import { ConfigService } from './services/config/config.service';
import { CustomerController } from './customer.controller';

@Module({
  imports: [],
  controllers: [UsersController,CustomerController],
  providers: [
    ConfigService,
    {
      provide: 'TOKEN_SERVICE',
      useFactory: (configService: ConfigService) => {
        const rabbitmqService = configService.get('rabbitmqService'); 
        return ClientProxyFactory.create({        
          transport: rabbitmqService.transport,
          options: {
            urls: [`amqp://${rabbitmqService.options.user}:${rabbitmqService.options.pass}@${rabbitmqService.options.host}`],            
            queue: rabbitmqService.options.queuename_gtts,
            queueOptions: {
              durable: true,
            },
          },
        })
      },
      inject: [ConfigService],
    },
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => {
        const rabbitmqService = configService.get('rabbitmqService'); 
        return ClientProxyFactory.create({        
          transport: rabbitmqService.transport,
          options: {
            urls: [`amqp://${rabbitmqService.options.user}:${rabbitmqService.options.pass}@${rabbitmqService.options.host}`],            
            queue: rabbitmqService.options.queuename_gtus,
            queueOptions: {
              durable: true,
            },
          },
        })
      },
      inject: [ConfigService],
    },
    {
      provide: 'CUSTOMER_SERVICE',
      useFactory: (configService: ConfigService) => {
        const rabbitmqService = configService.get('rabbitmqService'); 
        return ClientProxyFactory.create({        
          transport: rabbitmqService.transport,
          options: {
            urls: [`amqp://${rabbitmqService.options.user}:${rabbitmqService.options.pass}@${rabbitmqService.options.host}`],            
            queue: rabbitmqService.options.queuename_gtcs,
            queueOptions: {
              durable: true,
            },
          },
        })
      },
      inject: [ConfigService],
    },
    // {
    //   provide: 'TASK_SERVICE',
    //   useFactory: (configService: ConfigService) => {
    //     return ClientProxyFactory.create(configService.get('taskService'));
    //   },
    //   inject: [ConfigService],
    // },
    {
      provide: 'PERMISSION_SERVICE',
      useFactory: (configService: ConfigService) => {
        const rabbitmqService = configService.get('rabbitmqService'); 
        return ClientProxyFactory.create({        
          transport: rabbitmqService.transport,
          options: {
            urls: [`amqp://${rabbitmqService.options.user}:${rabbitmqService.options.pass}@${rabbitmqService.options.host}`],            
            queue: rabbitmqService.options.queuename_gtps,
            queueOptions: {
              durable: true,
            },
          },
        })
      },
      inject: [ConfigService],
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class AppModule {}
