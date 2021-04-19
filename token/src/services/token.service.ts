import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; 
import { InjectRepository } from "@nestjs/typeorm";
import { stringify } from 'node:querystring';
import { IToken } from '../interfaces/token.interface';
import { Token as TokenEntity } from '../model/token.entity';
import { TokenRepository } from "../model/token.repository";

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(TokenEntity) private readonly tokenRepository: TokenRepository

  ) {}

  public createToken(userId: string): Promise<IToken> {
    const token = this.jwtService.sign(
      {
        userId,
      },
      {
        expiresIn: 30 * 24 * 60 * 60,
      },
    );

    return this.tokenRepository.save({
      user_id: userId,
      token,
    });
  }

  public deleteTokenForUserId(userId: string): Promise<any> {

    const tokenModel =  this.tokenRepository.findOneOrFail({
      user_id: userId,
    });

    if (tokenModel && tokenModel[0]) {
      return this.tokenRepository.remove(tokenModel[0]);
    }
  }

  public async decodeToken(token: string) {
    
    let tokenData = token.replace("Bearer ", "");
    //console.log(`rawtoken : ${tokenData}`);
    const tokenModel = await this.tokenRepository.findOneOrFail({
      token: tokenData,
    });
    //console.log(tokenModel);
    //console.log(`tokenModel : ${tokenModel}`);
    //console.log(`remove : ${this.deleteTokenForUserId(temptoken)}`);
    //console.log(`tokenModel : ${await this.tokenModel.find()}`);

    let result = null;

    if (tokenModel /*&& tokenModel[0]*/) {
      try {
        const tokenData = this.jwtService.decode(tokenModel.token) as {
          exp: number;
          userId: any;
        };
        if (!tokenData || tokenData.exp <= Math.floor(+new Date() / 1000)) {
          result = null;
        } else {
          result = {
            userId: tokenData.userId,
          };
        }
      } catch (e) {
        result = null;
      }
    }
    return result;
  }
}
