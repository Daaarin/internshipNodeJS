import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
