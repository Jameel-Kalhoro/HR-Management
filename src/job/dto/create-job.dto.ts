import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CreateJobDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  Location: string;

  @IsNotEmpty()
  @IsDate()
  datePosted: Date;
}
