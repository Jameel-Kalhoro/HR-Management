import { Test, TestingModule } from '@nestjs/testing';
import { JobService } from './job.service';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JobApplication } from '../job-application/entities/job-application.entity';
import { Candidate } from '../candidate/entities/candidate.entity';

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

  

});
