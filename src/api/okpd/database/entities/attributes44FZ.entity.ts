import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { Okpd2Codes } from './okpd2codes.entity';

@Entity('Attributes44FZ')
export class Attributes44FZ {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ type: 'varchar', length: 250, nullable: false })
  Name: string;

  @Column({ type: 'text' })
  Description: string;

  @Column({ type: 'varchar', length: 450 })
  DocLink: string;

  @ManyToMany((type) => Okpd2Codes)
  @JoinTable()
  Okpd2Code_ID: number;
}
