import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'schools' }) // Set the table name to 'schools'
export class School extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({
  	type: 'enum',
  	enum: ['pending', 'published'],
  	default: 'pending',
  })
  status: 'pending' | 'published';

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  @Column({ type: 'varchar', length: 255, nullable: true, validator: 'isUrl' })
  schoolLogo: string | null;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'text' })
  about: string;

  @Column({ type: 'varchar', length: 255 })
  filemaker: string;

  @Column({ type: 'int', default: 0 })
  noOfStudents: number;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  @Column({ type: 'varchar', length: 255, nullable: true, validator: 'isUrl' })
  website: string | null;

  @Column({ type: 'varchar', length: 255 })
  countryCode: string;

  @Column({ type: 'varchar', length: 255 })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  brandColor1: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  brandColor2: string | null;

  @Column({ type: 'boolean', default: false })
  appClient: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
