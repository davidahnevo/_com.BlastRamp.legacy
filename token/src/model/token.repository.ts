import { EntityRepository, Repository } from 'typeorm';
import { Token as TokenEntity } from './token.entity';

@EntityRepository(TokenEntity)
export class TokenRepository extends Repository<TokenEntity> {}
