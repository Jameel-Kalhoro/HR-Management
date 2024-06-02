import { Test, TestingModule } from '@nestjs/testing';
import { JobApplicationController } from './job-application.controller';
import { JobApplicationService } from './job-application.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobApplication } from './entities/job-application.entity';

describe('JobApplicationController', () => {
  let controller: JobApplicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobApplicationController],
      providers: [
        JobApplicationService,
        {
          provide: getRepositoryToken(JobApplication),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<JobApplicationController>(JobApplicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  
});
