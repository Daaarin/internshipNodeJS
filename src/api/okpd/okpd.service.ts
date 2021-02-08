import { Injectable, Res } from '@nestjs/common';
import { RecordEntity } from './database/entities/record.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OkpdService {
  constructor(
    @InjectRepository(RecordEntity)
    private recordRepository: Repository<RecordEntity>
  ) {}

  async getAll(): Promise<RecordEntity[]> {
    return await this.recordRepository.find();
  }
}
