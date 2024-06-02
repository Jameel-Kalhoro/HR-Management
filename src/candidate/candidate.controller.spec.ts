import { Test, TestingModule } from '@nestjs/testing';
import { CandidateController } from './candidate.controller';
import { CandidateService } from './candidate.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Candidate } from './entities/candidate.entity';
import { JobApplication } from '../job-application/entities/job-application.entity';
import { Job } from '../job/entities/job.entity';

describe('CandidateController', () => {
  let controller: CandidateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CandidateController],
      providers: [
        CandidateService,
        {
          provide: getRepositoryToken(Candidate),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(JobApplication),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Job),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<CandidateController>(CandidateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
