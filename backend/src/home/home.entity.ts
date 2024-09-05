import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity('home')
export class Home {
  @PrimaryColumn({ name: 'street_address' })
  streetAddress: string;

  @Column()
  state: string;

  @Column()
  zip: string;

  @Column('decimal', { precision: 10, scale: 2 })
  sqft: number;

  @Column()
  beds: number;

  @Column()
  baths: number;

  @Column({ name: 'list_price', type: 'decimal', precision: 15, scale: 2 })
  listPrice: number;

  @ManyToMany(() => User, (user) => user.homes)
  users: User[];
}
