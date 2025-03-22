import { BaseEntity } from '../../common/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column()
  public email: string;

  @Column()
  public name: string;

  @Column()
  public password: string;
}
