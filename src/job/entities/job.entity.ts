import { Column, BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Job extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  location: string;

  @Column({type: 'date'})
  datePosted: Date;

}
