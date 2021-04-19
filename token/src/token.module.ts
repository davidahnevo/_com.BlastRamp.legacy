import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenController } from './token.controller';
import { TokenService } from './services/token.service';
import { JwtConfigService } from './services/config/jwt-config.service';

import { Token as TokenEntity } from './model/token.entity';

import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    JwtModule.registerAsync({ 
      useClass: JwtConfigService,
    }),
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
        TokenEntity,
      ],
    }),
    TypeOrmModule.forFeature(
      [TokenEntity]
    ),
  ],
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule {}
