import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 500 })
  user_id!: string;

  @Column({ length: 500 })
  token!: string;

//   @Column({ type: "datetime" })
//   created_at!: string;

//   @Column({ type: "timestamp", default: null })
//   updated_at!: string;


}
