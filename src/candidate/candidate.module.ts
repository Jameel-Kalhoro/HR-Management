import { Module } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CandidateController } from './candidate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidate } from './entities/candidate.entity';
import { Job } from 'src/job/entities/job.entity';
import { JobApplication } from 'src/job-application/entities/job-application.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Candidate,Job,JobApplication])],
  controllers: [CandidateController],
  providers: [CandidateService],
})
export class CandidateModule {}
