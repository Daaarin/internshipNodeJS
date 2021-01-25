import { Test, TestingModule } from '@nestjs/testing'
import { CbrController } from './cbr.controller'

describe('CbrController', () => {
  let controller: CbrController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CbrController],
    }).compile()

    controller = module.get<CbrController>(CbrController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
