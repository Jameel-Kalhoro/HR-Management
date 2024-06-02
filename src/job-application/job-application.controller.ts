import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JobApplicationService } from './job-application.service';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';

@Controller('job-application')
export class JobApplicationController {
  constructor(private readonly jobApplicationService: JobApplicationService) {}

  

  @Get()
  findAll() {
    return this.jobApplicationService.findAll();
  }
  
}
