import { Transport } from '@nestjs/microservices';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {
      port: process.env.CUSTOMER_SERVICE_PORT,
    };
    this.envConfig.baseUri = process.env.BASE_URI;
    this.envConfig.gatewayPort = process.env.API_GATEWAY_PORT;
    this.envConfig.mailerService = {
      options: {
        port: process.env.MAILER_SERVICE_PORT,
        host: process.env.MAILER_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };

    // Rabbit added 
    this.envConfig.rabbitmqService = {
      options: {
        default_user: process.env.RABBITMQ_DEFAULT_USER,
        default_pass: process.env.RABBITMQ_DEFAULT_PASS,
        user: process.env.RABBITMQ_USER,
        pass: process.env.RABBITMQ_PASSWORD,
        host: process.env.RABBITMQ_HOST,
        queuename: process.env.RABBITMQ_QUEUE_GTCS,   
        },
      transport: Transport.RMQ,
      };
    


  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
