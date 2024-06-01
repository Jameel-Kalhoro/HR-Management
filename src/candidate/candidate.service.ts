import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Candidate } from './entities/candidate.entity';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';

@Injectable()
export class CandidateService {
  constructor(
    @InjectRepository(Candidate)
    private readonly candidateRepo: Repository<Candidate>,
  ) {}
  
  // creating candidate
  async create(createCandidateDto: CreateCandidateDto) {
    const candidate = this.candidateRepo.create(createCandidateDto);
    return await this.candidateRepo.save(candidate);
  }

  // finding all candidates
  async findAll() {
    return await this.candidateRepo.find();
  }

  // getting data of single candidate
  async findOne(id: number) {
    const candidate = await this.candidateRepo.findOneBy({id});
    if(!candidate){
      throw new NotFoundException('Candidate does not exist');
    } 
    return candidate;
  }

  // update candidate data
  async update(id: number, updateCandidateDto: UpdateCandidateDto) {
    await this.candidateRepo.update(id,updateCandidateDto)
    return this.findOne(id);
  }

  // remove candidate
  async remove(id: number) {
    const candidate = await this.findOne(id)
    return this.candidateRepo.remove(candidate);
  }
}
