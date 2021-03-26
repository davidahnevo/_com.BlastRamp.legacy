import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import * as mongoose from 'mongoose';
//import * as bcrypt from 'bcrypt';
import { IUser } from '../interfaces/user.interface';

const SALT_ROUNDS = 10;

function transformValue(doc, ret: { [key: string]: any }) {
    delete ret._id;
}
  
function generateLink() {
    return Math.random().toString(36).replace('0.', '');
}



@Entity()
export class Userlink {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 500, })
  user_id!: string;

  @Column({default: false})
  is_used: Boolean;

  @Column({ length: 500,
            default: generateLink(), 
          })
  link: string;

}