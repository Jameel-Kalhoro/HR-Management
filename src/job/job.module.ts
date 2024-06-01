import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { JobApplication } from 'src/job-application/entities/job-application.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Job,JobApplication])],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
