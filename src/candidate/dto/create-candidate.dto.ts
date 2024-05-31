import {  IsNotEmpty, IsString } from "class-validator";

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
