import { Test, TestingModule } from '@nestjs/testing';
import { OkpdController } from './okpd.controller';

describe('OkpdController', () => {
  let controller: OkpdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OkpdController],
    }).compile();

    controller = module.get<OkpdController>(OkpdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
