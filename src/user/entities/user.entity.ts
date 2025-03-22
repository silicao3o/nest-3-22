import { BaseEntity } from '../../common/base.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as gravatar from 'gravatar';
import { InternalServerErrorException } from '@nestjs/common';

@Entity()
export class User extends BaseEntity {
  @Column()
  public email: string;

  @Column()
  public name: string;

  @Column()
  public password: string;

  @Column({ nullable: true })
  public profileImg?: string;

  // 비밀번호 암호화
  @BeforeInsert()
  async beforeSaveFunction(): Promise<void> {
    this.profileImg = gravatar.url(this.email, {
      s: '200',
      r: 'pg',
      d: 'mm',
      protocol: 'https',
    });

    if (this.password) {
      const saltValue = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, saltValue);
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(aPassword, this.password);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
