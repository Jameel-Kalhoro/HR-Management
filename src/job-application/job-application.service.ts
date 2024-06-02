import { Injectable } from '@nestjs/common';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JobApplication } from './entities/job-application.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JobApplicationService {
  constructor(
    @InjectRepository(JobApplication)
    private readonly jobAppRepo: Repository<JobApplication>,
  ){}


  async findAll(): Promise<JobApplication[]> {
    return this.jobAppRepo.find();
  }

  
}
