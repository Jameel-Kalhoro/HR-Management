import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { Repository } from 'typeorm';
import { JobApplication } from 'src/job-application/entities/job-application.entity';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly jobAppRepo: Repository<JobApplication>,
  ) {}
  create(createJobDto: CreateJobDto) {
    const jobApp = this.jobAppRepo.create(createJobDto);
    return this.jobAppRepo.save(jobApp);
  }

  findAll() {
    return this.jobAppRepo.find();
  }

  findOne(id: number) {
    return this.jobAppRepo.findOneBy({ id });
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return this.jobAppRepo.update(id, updateJobDto);
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}
