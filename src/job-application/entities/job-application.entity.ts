import { BaseEntity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
export class JobApplication extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    title: string;
  
    @Column()
    company: string;
  
    @Column()
    dateApplied: Date;
  
    @Column()
    status: 'applied' | 'interview' | 'offer' | 'rejected';
}
