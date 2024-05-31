import { Candidate } from 'src/candidate/entities/candidate.entity';
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

  @ManyToOne(()=>Candidate, candidate => candidate.applications)
  candidate: Candidate;

}
