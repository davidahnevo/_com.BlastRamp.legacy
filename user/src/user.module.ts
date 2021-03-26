import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { UserController } from './user.controller';
import { UserService } from './services/user.service';
import { ConfigService } from './services/config/config.service';
import { User as UserEntity } from './model/user.entity';
import { Userlink as UserlinkEntity} from './model/userlink.entity';

import { TypeOrmModule } from "@nestjs/typeorm";


@Module({
  imports: [
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
        UserEntity, 
        UserlinkEntity,
      ],
    }),
    TypeOrmModule.forFeature([
      UserEntity,
      UserlinkEntity,
    ]),


  ],
  controllers: [UserController],
  providers: [
    UserService,
    ConfigService,
    // {
    //   provide: 'MAILER_SERVICE',
    //   useFactory: (configService: ConfigService) => {
    //     const mailerServiceOptions = configService.get('mailerService');
    //     return ClientProxyFactory.create(mailerServiceOptions);
    //   },
    //   inject: [ConfigService],
    // },
  ],
})
export class UserModule {}
