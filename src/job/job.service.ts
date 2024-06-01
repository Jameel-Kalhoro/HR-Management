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
    private readonly jobAppRepo: Repository<Job>,
  ) {}

  // story 1 creating job as a user
  async create(createJobDto: CreateJobDto) : Promise<Job> {
    const jobApp = this.jobAppRepo.create(createJobDto);
    return await this.jobAppRepo.save(jobApp);
  }

  // finding all jobs available
  async findAll() {
    return await this.jobAppRepo.find();
  }


  // for searching job
  async findOne(id: number) {
    return await this.jobAppRepo.findOneBy({ id });
  }


  // user can remove his created job
  async remove(id: number) {
    await this.jobAppRepo.delete(id);
    return `This action removes a #${id} job`;
  }
}
