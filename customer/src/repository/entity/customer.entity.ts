import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ length: 50 })
  rtlr_id: string;

  @Column({ length: 50 })
  rtlr_code!: string;

  @Column({ length: 50 })
  rtlr_pwd: string;

  @Column({ length: 50 })
  name!: string;

}
