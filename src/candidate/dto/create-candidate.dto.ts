import {  IsArray, IsNotEmpty, IsString } from "class-validator";
import { JobApplication } from "src/job-application/entities/job-application.entity";

export class CreateCandidateDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    resume: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    
}
