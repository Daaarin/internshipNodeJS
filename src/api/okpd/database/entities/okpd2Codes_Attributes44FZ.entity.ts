import { Entity, ManyToMany, JoinTable, PrimaryGeneratedColumn } from 'typeorm';
import { Okpd2Codes } from './okpd2codes.entity';
import { Attributes44FZ } from './attributes44FZ.entity';

@Entity('Okpd2Codes_Attributes44FZ')
export class Okpd2Codes_Attributes44FZ {
  @PrimaryGeneratedColumn()
  ID: number;

  @ManyToMany((type) => Okpd2Codes)
  @JoinTable()
  Okpd2Code_ID: number;

  @ManyToMany((type) => Attributes44FZ)
  @JoinTable()
  Attributes44FZ_ID: number;
}
