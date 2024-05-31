import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Candidate {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    resume: string;

    @Column()
    status: string;
}
