import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Candidate } from './entities/candidate.entity';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { CreateJobApplicationDto } from 'src/job-application/dto/create-job-application.dto';
import { Job } from 'src/job/entities/job.entity';
import { JobApplication } from 'src/job-application/entities/job-application.entity';
import { UpdateJobApplicationDto } from 'src/job-application/dto/update-job-application.dto';

@Injectable()
export class CandidateService {
  constructor(
    @InjectRepository(Candidate)
    private readonly candidateRepo: Repository<Candidate>,
    @InjectRepository(Job)
    private readonly jobRepo: Repository<Job>,
    @InjectRepository(JobApplication)
    private readonly jobAppRepo: Repository<JobApplication>,
  ) {}
  
  // creating candidate
  async create(createCandidateDto: CreateCandidateDto) {
    const candidate = this.candidateRepo.create(createCandidateDto);
    return await this.candidateRepo.save(candidate);
  }

  // finding all candidates
  async findAll() {
    return await this.candidateRepo.find();
  }

  // getting data of single candidate
  async findOne(id: number) {
    const candidate = await this.candidateRepo.findOneBy({id});
    if(!candidate){
      throw new NotFoundException('Candidate does not exist');
    } 
    return candidate;
  }

  // update candidate data
  async update(id: number, updateCandidateDto: UpdateCandidateDto) {
    await this.candidateRepo.update(id,updateCandidateDto)
    return this.findOne(id);
  }

  // remove candidate
  async remove(id: number) {
    const candidate = await this.findOne(id)
    return this.candidateRepo.remove(candidate);
  }

  // creating job application
  async createJobApplication(createJobApplicationDto: CreateJobApplicationDto) {
    const { candidateId, jobId, ...jobAppDetails } = createJobApplicationDto;
    const candidate = await this.candidateRepo.findOneBy({ id: candidateId });
    const job = await this.jobRepo.findOneBy({ id: jobId });

    if (!candidate) {
      throw new NotFoundException('Candidate not found');
    }

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    const existingApplication = await this.jobAppRepo.findOne({
      where: { candidate: { id: candidateId }, job: { id: jobId } },
    });

    if (existingApplication) {
      throw new BadRequestException('Candidate has already applied for this job');
    }

    const jobApp = this.jobAppRepo.create({
      ...jobAppDetails,
      candidate,
      job,
    });

    return await this.jobAppRepo.save(jobApp);
  }


  // update job application
  async updateJobApplication(id: number, updateJobApplicationDto: UpdateJobApplicationDto) {
    const jobApp = await this.jobAppRepo.findOneBy({ id });
    if (!jobApp) {
      throw new NotFoundException('Job application not found');
    }
    await this.jobAppRepo.update(id, updateJobApplicationDto);
    return this.jobAppRepo.findOneBy({ id });
  }
}
