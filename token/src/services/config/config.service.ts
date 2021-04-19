import { Transport } from '@nestjs/microservices';

export class ConfigService {
    private readonly envConfig: { [key: string]: any } = null;
  
    constructor() {
      this.envConfig = {
        port: process.env.TOKEN_SERVICE_PORT,
      };
      this.envConfig.rabbitmqService = {
        options: {
          default_user: process.env.RABBITMQ_DEFAULT_USER,
          default_pass: process.env.RABBITMQ_DEFAULT_PASS,
          user: process.env.RABBITMQ_USER,
          pass: process.env.RABBITMQ_PASSWORD,
          host: process.env.RABBITMQ_HOST,
          queuename_gtts: process.env.RABBITMQ_QUEUE_GTTS, 

          },
        transport: Transport.RMQ,
        };

    this.envConfig.dbconnection = {
        host: process.env.DB_HOST,
        port: process.env.MYSQL_PORT,
        database: process.env.MYSQL_DATABASE,
        username: process.env.MYSQL_ROOT_USER,
        password: process.env.MYSQL_ROOT_PASSWORD,
        };

    }
  
    get(key: string): any {
      return this.envConfig[key];
    }
    //TEST
  }
  