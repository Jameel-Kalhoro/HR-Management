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

  create(createJobApplicationDto: CreateJobApplicationDto) {
    return 'This action adds a new jobApplication';
  }

  async findAll() {
    return this.jobAppRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} jobApplication`;
  }

  update(id: number, updateJobApplicationDto: UpdateJobApplicationDto) {
    return `This action updates a #${id} jobApplication`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobApplication`;
  }

  
}
