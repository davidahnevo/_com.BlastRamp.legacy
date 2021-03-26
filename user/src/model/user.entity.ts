import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { IUser } from '../interfaces/user.interface';

const SALT_ROUNDS = 10;

function transformValue(doc, ret: { [key: string]: any }) {
  delete ret._id;
  delete ret.password;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: string;

  // @Column({ length: 500 })
  // userid!: string;



  @Column({ length: 500 })
  email!: string;

  @Column()
  is_confirmed!: Boolean;

  @Column({ length: 500 })
  password!: string;
}



// User.methods.getEncryptedPassword = (password: string) => {
//   return bcrypt.hash(String(password), SALT_ROUNDS);
// };

// User.methods.compareEncryptedPassword = function (password: string) {
//   return bcrypt.compare(password, this.password);
// };

// User.pre('save', async function (next) {
//   const self = this as IUser;
//   if (!this.isModified('password')) {
//     return next();
//   }
//   self.password = await self.getEncryptedPassword(self.password);
//   next();
// });

