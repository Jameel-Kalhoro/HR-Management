import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { CreateJobApplicationDto } from '../job-application/dto/create-job-application.dto';
import { UpdateJobApplicationDto } from '../job-application/dto/update-job-application.dto';

@Controller('candidate')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Post()
  create(@Body() createCandidateDto: CreateCandidateDto) {
    return this.candidateService.create(createCandidateDto);
  }

  @Get()
  findAll() {
    return this.candidateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.candidateService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCandidateDto: UpdateCandidateDto,
  ) {
    return this.candidateService.update(+id, updateCandidateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.candidateService.remove(+id);
  }

  @Post(':id/apply')
  apply(
    @Param('id') candidateId:string,
    @Body() createJobApplicationDto: CreateJobApplicationDto,
  ) {
    return this.candidateService.createJobApplication({ ...createJobApplicationDto, candidateId: + candidateId });
  }

  @Patch('application/:id')
  updateApplication(
    @Param('id') id: string,
    @Body() updateJobApplicationDto: UpdateJobApplicationDto,
  ) {
    return this.candidateService.updateJobApplication(+id, updateJobApplicationDto);
  }
}
