import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsDate, IsArray, IsNumber } from 'class-validator';

export class CreateJobApplicationDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  coverLetter: string;

  @IsNotEmpty()
  @Type(()=>Date)
  @IsDate()
  dateApplied: Date;

  @IsNotEmpty()
  status: 'applied' | 'interview' | 'offer' | 'rejected';

  @IsNumber()
  @IsNotEmpty()
  candidateId: number;

  @IsNumber()
  @IsNotEmpty()
  jobId: number;
}
