import { Test, TestingModule } from '@nestjs/testing';
import { JobService } from './job.service';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JobApplication } from '../job-application/entities/job-application.entity';
import { Candidate } from '../candidate/entities/candidate.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { NotFoundException } from '@nestjs/common';

describe('JobService', () => {
  let service: JobService;
  let jobRepo: Repository<Job>;
  let jobAppRepo: Repository<JobApplication>;
  let candidateRepo: Repository<Candidate>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobService,
        {
          provide: getRepositoryToken(Job),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(JobApplication),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Candidate),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<JobService>(JobService);
    jobRepo = module.get<Repository<Job>>(getRepositoryToken(Job));
    jobAppRepo = module.get<Repository<JobApplication>>(getRepositoryToken(JobApplication));
    candidateRepo = module.get<Repository<Candidate>>(getRepositoryToken(Candidate));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // test cases for job services
  describe('create', () => {
    // test for creating job
    it('should create a new job', async () => {
      const createJobDto: CreateJobDto = {
        title: 'Backend Developer',
        description: 'Develop backend services',
        location: 'sukkur',
        datePosted: new Date(),
      };

      const job = { id: 1, ...createJobDto };
      jest.spyOn(jobRepo, 'create').mockReturnValue(job as any);
      jest.spyOn(jobRepo, 'save').mockResolvedValue(job as any);

      const result = await service.create(createJobDto);
      expect(result).toEqual(job);
      expect(jobRepo.create).toHaveBeenCalledWith(createJobDto);
      expect(jobRepo.save).toHaveBeenCalledWith(job);
    });
  });
  
  describe('findAll', () => {
    // test for finding all created jobs
    it('should return an array of jobs', async () => {
      const jobs = [
        { id: 1, title: 'Backend Developer', description: 'Develop backend services', location: 'Sukkur', datePosted: new Date() },
        { id: 2, title: 'Frontend Developer', description: 'Develop frontend interfaces', location: 'Karachi', datePosted: new Date() },
      ];
      jest.spyOn(jobRepo, 'find').mockResolvedValue(jobs as any);

      const result = await service.findAll();
      expect(result).toEqual(jobs);
      expect(jobRepo.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    // test for finding single job
    it('should return a single job by id', async () => {
      const job = { id: 1, title: 'Backend Developer', description: 'Develop backend services', location: 'Remote', datePosted: new Date() };
      jest.spyOn(jobRepo, 'findOneBy').mockResolvedValue(job as any);

      const result = await service.findOne(1);
      expect(result).toEqual(job);
      expect(jobRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('remove', () => {
    // test for removing job
    it('should remove a job by id', async () => {
      jest.spyOn(jobRepo, 'delete').mockResolvedValue({} as any);

      const result = await service.remove(1);
      expect(result).toEqual('This action removes a #1 job');
      expect(jobRepo.delete).toHaveBeenCalledWith(1);
    });
  });

  describe('acceptJobApplication', () => {
    // test for acceptin job application
    it('should accept a job application by id', async () => {
      const jobApplication = { id: 1, status: 'applied', jobId: 1, candidateId: 1 };
      const updatedJobApplication = { ...jobApplication, status: 'interview' };

      jest.spyOn(jobAppRepo, 'findOneBy').mockResolvedValue(jobApplication as any);
      jest.spyOn(jobAppRepo, 'update').mockResolvedValue(updatedJobApplication as any);

      const result = await service.acceptJobApplication(1);
      expect(result).toEqual(updatedJobApplication);
      expect(jobAppRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(jobAppRepo.update).toHaveBeenCalledWith(1, updatedJobApplication);
    });
  });

  describe('rejectJobApplication', () => {
    // test for rejecting job application
    it('should reject a job application by id', async () => {
      const jobApplication = { id: 1, status: 'applied', jobId: 1, candidateId: 1 };
      const updatedJobApplication = { ...jobApplication, status: 'rejected' };

      jest.spyOn(jobAppRepo, 'findOneBy').mockResolvedValue(jobApplication as any);
      jest.spyOn(jobAppRepo, 'update').mockResolvedValue(updatedJobApplication as any);

      const result = await service.rejectJobApplication(1);
      expect(result).toEqual(updatedJobApplication);
      expect(jobAppRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(jobAppRepo.update).toHaveBeenCalledWith(1, updatedJobApplication);
    });
  });

  describe('findJobApplicationsByCandidate', () => {
    // test for finding job applications applied by the candidate
    it('should return job applications by candidate id', async () => {
      const candidate = { id: 1, applications: [{ id: 1, status: 'applied', jobId: 1 }, { id: 2, status: 'applied', jobId: 2 }] };
      jest.spyOn(candidateRepo, 'findOne').mockResolvedValue(candidate as any);

      const result = await service.findJobApplicationsByCandidate(1);
      expect(result).toEqual(candidate.applications);
      expect(candidateRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['applications'] });
    });
  });

});
