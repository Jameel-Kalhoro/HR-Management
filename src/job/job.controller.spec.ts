import { Test, TestingModule } from '@nestjs/testing';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JobApplication } from '../job-application/entities/job-application.entity';
import { Candidate } from '../candidate/entities/candidate.entity';

describe('JobController', () => {
  let controller: JobController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobController],
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

    controller = module.get<JobController>(JobController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  
  
});
