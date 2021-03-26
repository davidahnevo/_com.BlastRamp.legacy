import { NestFactory } from '@nestjs/core';
import { Transport, TcpOptions, MicroserviceOptions } from '@nestjs/microservices';

import { PermissionModule } from './permission.module';
import { ConfigService } from './services/config/config.service';

async function bootstrap() {

  const rabbitmqService = new ConfigService().get('rabbitmqService'); 
  const app = await NestFactory.createMicroservice(PermissionModule, {
    transport: rabbitmqService.transport,
    options: {
      urls: [`amqp://${rabbitmqService.options.user}:${rabbitmqService.options.pass}@${rabbitmqService.options.host}`],            
      queue: rabbitmqService.options.queuename_gtps,
      noAck: false,
      queueOptions: {
        durable: true,
      },
    },
  });
  app.listenAsync(); 
}
bootstrap();
