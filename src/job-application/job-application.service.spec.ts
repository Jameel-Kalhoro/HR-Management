import { Test, TestingModule } from '@nestjs/testing';
import { JobApplicationService } from './job-application.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobApplication } from './entities/job-application.entity';

describe('JobApplicationService', () => {
  let service: JobApplicationService;
  let jobAppRepo: Repository<JobApplication>;

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
    jobAppRepo = module.get<Repository<JobApplication>>(getRepositoryToken(JobApplication));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    // test for finding all job applications
    it('should return an array of job applications', async () => {
      const jobApplications = [
        {
          id: 1,
          title: 'Full Stack Developer',
          coverLetter: 'Cover letter content',
          dateApplied: new Date(),
          status: 'applied',
          candidateId: 1,
          jobId: 1,
        },
        {
          id: 2,
          title: 'Backend Developer',
          coverLetter: 'Cover letter content',
          dateApplied: new Date(),
          status: 'interview',
          candidateId: 2,
          jobId: 2,
        },
      ];

      jest.spyOn(jobAppRepo, 'find').mockResolvedValue(jobApplications as any);

      const result = await service.findAll();
      expect(result).toEqual(jobApplications);
      expect(jobAppRepo.find).toHaveBeenCalled();
    });
  });
});
