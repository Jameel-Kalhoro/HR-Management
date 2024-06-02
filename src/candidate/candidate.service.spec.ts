import { Test, TestingModule } from '@nestjs/testing';
import { CandidateService } from './candidate.service';
import { Repository } from 'typeorm';
import { Candidate } from './entities/candidate.entity';
import { JobApplication } from '../job-application/entities/job-application.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Job } from '../job/entities/job.entity';
import { CreateCandidateDto } from './dto/create-candidate.dto'; 
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UpdateCandidateDto } from './dto/update-candidate.dto';

describe('CandidateService', () => {
  let service: CandidateService;
  let candidateRepo: Repository<Candidate>;
  let jobAppRepo: Repository<JobApplication>;
  let jobRepo: Repository<Job>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<CandidateService>(CandidateService);
    candidateRepo = module.get<Repository<Candidate>>(getRepositoryToken(Candidate));
    jobAppRepo = module.get<Repository<JobApplication>>(getRepositoryToken(JobApplication));
    jobRepo = module.get<Repository<Job>>(getRepositoryToken(Job));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // test for methods in services
  describe('create', () => {
    // test for adding now candidate
    it('should create a new candidate', async () => {
      const createCandidateDto: CreateCandidateDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+92-123-5678',
        resume: 'resume.pdf',
      };
      const createdCandidate = { id: 1, ...createCandidateDto };

      jest.spyOn(candidateRepo, 'findOneBy').mockResolvedValue(null);
      jest.spyOn(candidateRepo, 'create').mockReturnValue(createdCandidate as any);
      jest.spyOn(candidateRepo, 'save').mockResolvedValue(createdCandidate as any);

      const result = await service.create(createCandidateDto);
      expect(result).toEqual(createdCandidate);
      expect(candidateRepo.create).toHaveBeenCalledWith(createCandidateDto);
      expect(candidateRepo.save).toHaveBeenCalledWith(createdCandidate);
    });
  });


  describe('findAll', () => {
    // test for finding all candidates
    it('should return an array of candidates', async () => {
      const candidates = [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', resume: 'resume.pdf', phone: '123-456-7890' },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', resume: 'resume2.pdf', phone: '987-654-3210' },
      ];

      jest.spyOn(candidateRepo, 'find').mockResolvedValue(candidates as any);

      const result = await service.findAll();
      expect(result).toEqual(candidates);
      expect(candidateRepo.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    //test for finding the candidate if found
    it('should return a candidate by id', async () => {
      const candidate = { id: 1, name: 'John Doe', email: 'john.doe@example.com', resume: 'resume.pdf', phone: '123-456-7890' };
  
      jest.spyOn(candidateRepo, 'findOneBy').mockResolvedValue(candidate as any);
  
      const result = await service.findOne(1);
      expect(result).toEqual(candidate);
      expect(candidateRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });
  
    // test for finding the candidate if not found
    it('should throw a NotFoundException if candidate not found', async () => {
      jest.spyOn(candidateRepo, 'findOneBy').mockResolvedValue(null);
  
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
      expect(candidateRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });
  });
  
  describe('update', () => {
    // test for updating the candidate if found
    it('should update a candidate', async () => {
      const updateCandidateDto: UpdateCandidateDto = {
        name: 'John Updated',
        email: 'john.updated@example.com',
        phone: '123-456-7890',
        resume: 'updated_resume.pdf',
      };
      const candidate = { id: 1, ...updateCandidateDto };
  
      jest.spyOn(candidateRepo, 'update').mockResolvedValue({ affected: 1 } as any);
      jest.spyOn(service, 'findOne').mockResolvedValue(candidate as any);
  
      const result = await service.update(1, updateCandidateDto);
      expect(result).toEqual(candidate);
      expect(candidateRepo.update).toHaveBeenCalledWith(1, updateCandidateDto);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  
    // test for updating the candidate if not found
    it('should throw a NotFoundException if candidate not found', async () => {
      const updateCandidateDto: UpdateCandidateDto = {
        name: 'John Updated',
        email: 'john.updated@example.com',
        phone: '123-456-7890',
        resume: 'updated_resume.pdf',
      };
  
      jest.spyOn(candidateRepo, 'update').mockResolvedValue({ affected: 0 } as any);
      jest.spyOn(service, 'findOne').mockImplementation(() => { throw new NotFoundException(); });
  
      await expect(service.update(1, updateCandidateDto)).rejects.toThrow(NotFoundException);
      expect(candidateRepo.update).toHaveBeenCalledWith(1, updateCandidateDto);
    });
  });
  
  describe('remove', () => {
    // test for successful removal of candiate
    it('should remove a candidate by id', async () => {
      const candidate = {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+92-123-5678',
        resume: 'resume.pdf',
      };
  
      jest.spyOn(service, 'findOne').mockResolvedValue(candidate as any);
      jest.spyOn(candidateRepo, 'remove').mockResolvedValue(candidate as any);
  
      const result = await service.remove(1);
      expect(result).toEqual(candidate);
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(candidateRepo.remove).toHaveBeenCalledWith(candidate);
    });
  });

  describe('createJobApplication', () => {
    const createJobApplicationDto = {
      id: 1,
      title: "Developer",
      coverLetter:"this is a cover letter",
      candidateId: 1,
      jobId: 1,
      applicationDate: new Date(),
      status: 'applied',
    };
  
    const candidate = { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '+92-123-5678', resume: 'resume.pdf' };
    const job = { id: 1, title: 'Software Engineer', description: 'Job description', location: 'Remote', datePosted: new Date() };
    
    // test for creating job application
    it('should create a new job application', async () => {
      jest.spyOn(candidateRepo, 'findOneBy').mockResolvedValue(candidate as any);
      jest.spyOn(jobRepo, 'findOneBy').mockResolvedValue(job as any);
      jest.spyOn(jobAppRepo, 'findOne').mockResolvedValue(null);
      jest.spyOn(jobAppRepo, 'create').mockReturnValue(createJobApplicationDto as any);
      jest.spyOn(jobAppRepo, 'save').mockResolvedValue(createJobApplicationDto as any);
  
      const result = await service.createJobApplication(createJobApplicationDto as any);
      expect(result).toEqual(createJobApplicationDto);
      expect(candidateRepo.findOneBy).toHaveBeenCalledWith({ id: createJobApplicationDto.candidateId });
      expect(jobRepo.findOneBy).toHaveBeenCalledWith({ id: createJobApplicationDto.jobId });
      expect(jobAppRepo.findOne).toHaveBeenCalledWith({
        where: { candidate: { id: createJobApplicationDto.candidateId }, job: { id: createJobApplicationDto.jobId } },
      });
      expect(jobAppRepo.save).toHaveBeenCalledWith(createJobApplicationDto);
    });
  });

  describe('updateJobApplication', () => {
    const updateJobApplicationDto = {
      status: 'interview',
    };
  
    const existingJobApp = {
      id: 1,
      title: 'Full Stack Developer',
      coverLetter: 'I am writing to apply for the Full Stack Developer position at your company. I have been working as a Full Stack Developer for a few years now and I think I would be a good fit for this job. I have experience with a lot of different technologies like JavaScript, HTML, CSS, and Python.',
      dateApplied: '6-1-2024',
      status: 'interview',
      candidateId: 2,
      jobId: 6,
    };
  
    const updatedJobApp = {
      ...existingJobApp,
      ...updateJobApplicationDto,
    };
    
    // test for updating existing job application
    it('should update an existing job application', async () => {
      jest.spyOn(jobAppRepo, 'findOneBy').mockResolvedValueOnce(existingJobApp as any);
      jest.spyOn(jobAppRepo, 'update').mockResolvedValueOnce(undefined);
      jest.spyOn(jobAppRepo, 'findOneBy').mockResolvedValueOnce(updatedJobApp as any);
  
      const result = await service.updateJobApplication(existingJobApp.id, updateJobApplicationDto as any);
      expect(result).toEqual(updatedJobApp);
      expect(jobAppRepo.findOneBy).toHaveBeenCalledWith({ id: existingJobApp.id });
      expect(jobAppRepo.update).toHaveBeenCalledWith(existingJobApp.id, updateJobApplicationDto);
      expect(jobAppRepo.findOneBy).toHaveBeenCalledWith({ id: existingJobApp.id });
    });
  
    // test for update job application if application not found
    it('should throw a NotFoundException if job application not found', async () => {
      jest.spyOn(jobAppRepo, 'findOneBy').mockResolvedValueOnce(null);
  
      await expect(service.updateJobApplication(existingJobApp.id, updateJobApplicationDto as any)).rejects.toThrow(NotFoundException);
      expect(jobAppRepo.findOneBy).toHaveBeenCalledWith({ id: existingJobApp.id });
    });
  });
  
  
    
});
