import { JobApplication } from "src/job-application/entities/job-application.entity";
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class Candidate extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    resume: string;

    @Column()
    phone: string;

    @OneToMany(() => JobApplication, jobApplication => jobApplication.candidate)
    applications: JobApplication[];
}
