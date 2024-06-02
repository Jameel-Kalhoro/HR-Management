import { JobApplication } from '../../job-application/entities/job-application.entity';
import { Column, BaseEntity, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
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

  @OneToMany(()=>JobApplication, jobApplication=>jobApplication.job)
  applications: JobApplication[];

}
