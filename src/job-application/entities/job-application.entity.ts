import { Candidate } from 'src/candidate/entities/candidate.entity';
import { Job } from 'src/job/entities/job.entity';
import { BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, Entity} from 'typeorm';

@Entity()
export class JobApplication extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  coverLetter: string;

  @Column({type:'date'})
  dateApplied: Date;

  @Column()
  status: 'applied' | 'interview' | 'offer' | 'rejected';

  @Column()
  candidateId: number;

  @Column()
  jobId: number;



  @ManyToOne(()=>Candidate, candidate => candidate.applications)
  candidate: Candidate;

  @ManyToOne(()=>Job, job=>job.applications)
  job: Job

}
