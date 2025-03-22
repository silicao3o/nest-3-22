import { BaseEntity } from '../../common/base.entity';
import { Column } from 'typeorm';

export class User extends BaseEntity {
  @Column()
  public email: string;

  @Column()
  public name: string;

  @Column()
  public password: string;
}
