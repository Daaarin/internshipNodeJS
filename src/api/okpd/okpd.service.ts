import { Injectable } from '@nestjs/common';
import { Product } from './database/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Okpd2Codes } from './database/entities/okpd2codes.entity';
import { Attributes44FZ } from './database/entities/attributes44FZ.entity';
import { Okpd2Codes_Attributes44FZ } from './database/entities/okpd2Codes_Attributes44FZ.entity';

@Injectable()
export class OkpdService {
  constructor(
    /*@InjectRepository(Product)
    private productRepository: Repository<Product>,*/
    @InjectRepository(Okpd2Codes)
    private okpd2CodesRepository: Repository<Okpd2Codes>,
    @InjectRepository(Attributes44FZ)
    private attributes44FZRepository: Repository<Attributes44FZ>,
    @InjectRepository(Okpd2Codes_Attributes44FZ)
    private okpd2Codes_Attributes44FZRepository: Repository<Okpd2Codes_Attributes44FZ>
  ) {}

  /*async getAll(): Promise<Product[]> {
    return await this.productRepository.find({
      select: ['Code', 'Name', 'Notes']
    });
  }*/
  async getAllData(): Promise<Okpd2Codes[]> {
    const data = await this.okpd2CodesRepository.find();
    console.log('1st data from Db: ', data);
    return await data;
  }
}
