import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { Repository, UpdateResult } from 'typeorm';
import { JobApplication } from '../job-application/entities/job-application.entity';
import { Candidate } from '../candidate/entities/candidate.entity';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly jobAppRepo: Repository<Job>,
    @InjectRepository(JobApplication)
    private readonly jobApplicationRep: Repository<JobApplication>,
    @InjectRepository(Candidate)
    private readonly candidateRepo: Repository<Candidate>
  ) {}

  // story 1 creating job as a user
  async create(createJobDto: CreateJobDto) : Promise<Job> {
    const jobApp = this.jobAppRepo.create(createJobDto);
    return await this.jobAppRepo.save(jobApp);
  }

  // finding all jobs available
  async findAll(): Promise<Job[]> {
    return await this.jobAppRepo.find();
  }


  // for searching job
  async findOne(id: number): Promise<Job> {
    return await this.jobAppRepo.findOneBy({ id });
  }


  // user can remove his created job
  async remove(id: number): Promise<String> {
    await this.jobAppRepo.delete(id);
    return `This action removes a #${id} job`;
  }

  // user can accept job application
  async acceptJobApplication(id:number): Promise<UpdateResult>{
    const jobApplicationRep = await this.jobApplicationRep.findOneBy({id});
    if(!jobApplicationRep){
      throw new NotFoundException("Job application not found");
    }
    jobApplicationRep.status = 'interview';

    return await this.jobApplicationRep.update(id,jobApplicationRep);
  }

  // user can reject job application
  async rejectJobApplication(id:number): Promise<UpdateResult>{
    const jobApplicationRep = await this.jobApplicationRep.findOneBy({id});
    if(!jobApplicationRep){
      throw new NotFoundException("Job application not found");
    }
    jobApplicationRep.status = 'rejected';

    return await this.jobApplicationRep.update(id,jobApplicationRep);
  }
  
  // user can view all applications applied by single candidate
  async findJobApplicationsByCandidate(candidateId:number):Promise<JobApplication[]>{
    const candidate = await this.candidateRepo.findOne({where:{id: candidateId}, relations:['applications']});
    if(!candidate){
      throw new NotFoundException("Applications not found")
    }
    return candidate.applications;
  }
}
