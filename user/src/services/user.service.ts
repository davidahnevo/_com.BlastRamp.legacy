import { Injectable } from '@nestjs/common';

import { ConfigService } from './config/config.service';
import { IUser } from '../interfaces/user.interface';
import { IUserLink } from '../interfaces/user-link.interface';
import { User as UserEntity } from '../model/user.entity';
import { UserRepository } from "../model/user.repository";
import { Userlink as UserlinkEntity } from '../model/userlink.entity';
import { UserlinkRepository } from "../model/userlink.repository";

import * as bcrypt from 'bcrypt';
const SALT_ROUNDS = 10;


import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: UserRepository,
    @InjectRepository(UserlinkEntity) private readonly userlinkRepository: UserlinkRepository,
    private readonly configService: ConfigService,
  ) {}

  public async searchUser(params: { email: string }): Promise<any[]> {
    return this.userRepository.find(params);
  }

  public async searchUserById(id : string): Promise<any> {
    return this.userRepository.findOne({id : id});
  }

  public async updateUserById(
    id: string,
    userParams: { is_confirmed: boolean },
  ): Promise<any> {
    return this.userRepository.update({ id: id }, userParams);
  }

  public async createUser(user: IUser): Promise<IUser> {
    const enpassword = await bcrypt.hash(String(user.password), SALT_ROUNDS);
    user.password = enpassword.toString();

    //console.log(`User.service - encrypted save_user: ${user.password}`);

    return await this.userRepository.save(user);
  }

  public async createUserLink(id: string): Promise<any> {
    //console.log(`createUserLink : ${id}`);
    return await this.userlinkRepository.save({user_id: id});
  }

  public async getUserLink(link: string): Promise<any> {
    return this.userlinkRepository.find({ link, is_used: false });
  }

  public async updateUserLinkById(
    id: string,
    linkParams: { is_used: boolean },
  ): Promise<any> {
    return this.userlinkRepository.update({ user_id: id }, linkParams);
  }

  public getConfirmationLink(link: string): string {
    return `${this.configService.get('baseUri')}:${this.configService.get(
      'gatewayPort',
    )}/users/confirm/${link}`;
  }
}
