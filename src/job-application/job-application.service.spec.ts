import { Test, TestingModule } from '@nestjs/testing';
import { JobApplicationService } from './job-application.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobApplication } from './entities/job-application.entity';

describe('JobApplicationService', () => {
  let service: JobApplicationService;
  let repo: Repository<JobApplication>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        providers: [
            JobApplicationService,
            {
              provide: getRepositoryToken(JobApplication),
              useClass: Repository,
            },
          ],
    }).compile();

    service = module.get<JobApplicationService>(JobApplicationService);
    repo = module.get<Repository<JobApplication>>(getRepositoryToken(JobApplication));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  
});
