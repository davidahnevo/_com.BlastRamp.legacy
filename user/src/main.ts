import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';

import { ConfigService } from './services/config/config.service';

async function bootstrap() {
  const rabbitmqService = new ConfigService().get('rabbitmqService');  // app.get('ConfigService').get('rabbitmqService');

   //app.connectMicroservice<MicroserviceOptions>({
  const app = await NestFactory.createMicroservice(UserModule, {
    transport: rabbitmqService.transport,
    options: {
      urls: [`amqp://${rabbitmqService.options.user}:${rabbitmqService.options.pass}@${rabbitmqService.options.host}`],            
      queue: rabbitmqService.options.queuename,
      noAck: false,
      queueOptions: {
        durable: true,
      },
    },
  });
  app.listenAsync(); 
}
bootstrap();
