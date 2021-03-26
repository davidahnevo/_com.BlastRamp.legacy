import { EntityRepository, Repository } from 'typeorm';
import { Userlink as UserlinkEntity } from './userlink.entity';

@EntityRepository(UserlinkEntity)
export class UserlinkRepository extends Repository<UserlinkEntity> {}
