import { Injectable } from '@nestjs/common';
import { Product } from './database/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OkpdService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}

  async getAll(): Promise<Product[]> {
    return await this.productRepository.find({
      select: ['Code', 'Name', 'Notes']
    });
  }
}
