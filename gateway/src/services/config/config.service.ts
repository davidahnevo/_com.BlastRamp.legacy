import { Transport } from '@nestjs/microservices';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};
    this.envConfig.port = process.env.API_GATEWAY_PORT;
    this.envConfig.tokenService = {
      options: {
        port: process.env.TOKEN_SERVICE_PORT,
        host: process.env.TOKEN_SERVICE_HOST,
      },
      transport: Transport.RMQ,
    };
    this.envConfig.userService = {
      options: {
        port: process.env.USER_SERVICE_PORT,
        host: process.env.USER_SERVICE_HOST,
      },
      transport: Transport.RMQ,
    };
    // this.envConfig.taskService = {
    //   options: {
    //     port: process.env.TASK_SERVICE_PORT,
    //     host: process.env.TASK_SERVICE_HOST,
    //   },
    //   transport: Transport.RMQ,
    // };
    this.envConfig.permissionService = {
      options: {
        port: process.env.PERMISSION_SERVICE_PORT,
        host: process.env.PERMISSION_SERVICE_HOST,
      },
      transport: Transport.RMQ,
    };

    this.envConfig.rabbitmqService = {
      options: {
        default_user: process.env.RABBITMQ_DEFAULT_USER,
        default_pass: process.env.RABBITMQ_DEFAULT_PASS,
        user: process.env.RABBITMQ_USER,
        pass: process.env.RABBITMQ_PASSWORD,
        host: process.env.RABBITMQ_HOST,
        queuename_gtus: process.env.RABBITMQ_QUEUE_GTUS,   
        queuename_gtts: process.env.RABBITMQ_QUEUE_GTTS, 
        queuename_gtps: process.env.RABBITMQ_QUEUE_GTPS, 
        queuename_gtcs: process.env.RABBITMQ_QUEUE_GTCS, 
        },
      transport: Transport.RMQ,
      };


  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
