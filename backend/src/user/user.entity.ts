import { Home } from 'src/home/home.entity';
import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryColumn()
  username: string;

  @Column()
  email: string;

  @ManyToMany(() => Home, (home) => home.users)
  @JoinTable({
    name: 'user_home',
    joinColumn: {
      name: 'username',
      referencedColumnName: 'username',
    },
    inverseJoinColumn: {
      name: 'street_address',
      referencedColumnName: 'streetAddress',
    },
  })
  homes: Home[];
}
