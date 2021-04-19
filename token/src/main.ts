import { NestFactory } from '@nestjs/core';
import { TokenModule } from './token.module';

import { ConfigService } from './services/config/config.service';

async function bootstrap() {

  const rabbitmqService = new ConfigService().get('rabbitmqService');   

  const app = await NestFactory.createMicroservice(TokenModule, {
    transport: rabbitmqService.transport,
    options: {
      urls: [`amqp://${rabbitmqService.options.user}:${rabbitmqService.options.pass}@${rabbitmqService.options.host}`],            
      queue: rabbitmqService.options.queuename_gtts,
      noAck: false,
      queueOptions: {
        durable: true,
      },
    },
  });
  app.listenAsync(); 

}
bootstrap();
