import { EntityRepository, Repository } from 'typeorm';
import { User as UserEntity } from './user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {}

