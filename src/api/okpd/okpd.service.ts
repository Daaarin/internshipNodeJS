import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Okpd2Codes } from './database/entities/okpd2codes.entity';
import { Attributes44FZ } from './database/entities/attributes44FZ.entity';

@Injectable()
export class OkpdService {
  constructor(
    @InjectRepository(Okpd2Codes)
    private okpd2CodesRepository: Repository<Okpd2Codes>,
    @InjectRepository(Attributes44FZ)
    private attributes44FZRepository: Repository<Attributes44FZ>
  ) {}

  async getAllCodes(): Promise<Okpd2Codes[]> {
    return await this.okpd2CodesRepository.find();
  }
}
