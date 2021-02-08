import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('OKPD')
export class Product {
  @PrimaryColumn({ nullable: false })
  ID: number;

  @Column({ type: 'nvarchar', length: 1, nullable: true })
  Section: string;

  @Column({ type: 'nvarchar', length: 250, nullable: true })
  SectionName: string;

  @Column({ type: 'nvarchar', length: 2, nullable: true })
  SubSection: string;

  @Column({ type: 'nvarchar', length: 250, nullable: true })
  SubSectionName: string;

  @Column({ type: 'nvarchar', length: 12, nullable: true })
  Code: string;

  @Column({ type: 'nvarchar', length: 500, nullable: true })
  Name: string;

  @Column({ type: 'nvarchar', length: 4000, nullable: true })
  Notes: string;

  @Column({ type: 'nvarchar', length: 2, nullable: true })
  SubCode1: string;

  @Column({ type: 'nvarchar', length: 2, nullable: true })
  SubCode2: string;

  @Column({ type: 'nvarchar', length: 2, nullable: true })
  SubCode3: string;

  @Column({ type: 'nvarchar', length: 3, nullable: true })
  SubCode4: string;
}
