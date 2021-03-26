import { Transport } from '@nestjs/microservices';

export class ConfigService {
    private readonly envConfig: { [key: string]: any } = null;
  
    constructor() {
      this.envConfig = {
        port: process.env.PERMISSION_SERVICE_PORT,
      };

      this.envConfig.rabbitmqService = {
        options: {
          default_user: process.env.RABBITMQ_DEFAULT_USER,
          default_pass: process.env.RABBITMQ_DEFAULT_PASS,
          user: process.env.RABBITMQ_USER,
          pass: process.env.RABBITMQ_PASSWORD,
          host: process.env.RABBITMQ_HOST,
          queuename_gtps: process.env.RABBITMQ_QUEUE_GTPS,   
          },
        transport: Transport.RMQ,
        };
    }
  


    get(key: string): any {
      return this.envConfig[key];
    }
  }
  