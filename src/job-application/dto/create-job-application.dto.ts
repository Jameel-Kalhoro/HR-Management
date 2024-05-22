
import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class CreateJobApplicationDto {

  
    @IsNotEmpty()
    @IsString()
    title: string;
  
    @IsNotEmpty()
    @IsString()
    company: string;
  
    @IsNotEmpty()
    @IsDate()
    dateApplied: Date;
  
    @IsNotEmpty()
    status: 'applied' | 'interview' | 'offer' | 'rejected';
}
