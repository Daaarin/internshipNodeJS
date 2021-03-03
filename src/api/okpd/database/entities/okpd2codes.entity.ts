import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
