import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { Attributes44FZ } from './attributes44FZ.entity';

@Entity('Okpd2Codes')
export class Okpd2Codes {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ type: 'varchar', length: 250, nullable: false })
  Name: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  Code: string;

  @Column({ type: 'text', nullable: true })
  Notes: string;

  @ManyToMany((type) => Attributes44FZ)
  @JoinTable()
  Attributes44FZ_ID: number;
}
