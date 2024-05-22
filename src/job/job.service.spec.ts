import { Test, TestingModule } from '@nestjs/testing';
import { JobService } from './job.service';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('JobService', () => {
  let service: JobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobService,
        {
          provide: getRepositoryToken(Job),
          useClass: Repository<Job>,
        },
      ],
    }).compile();

    service = module.get<JobService>(JobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
