import { Test, TestingModule } from '@nestjs/testing';
import { OkpdService } from './okpd.service';

describe('OkpdService', () => {
  let service: OkpdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OkpdService],
    }).compile();

    service = module.get<OkpdService>(OkpdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
