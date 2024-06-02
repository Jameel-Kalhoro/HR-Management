import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { JobApplication } from 'src/job-application/entities/job-application.entity';
import { Candidate } from '../candidate/entities/candidate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Job,JobApplication, Candidate])],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
