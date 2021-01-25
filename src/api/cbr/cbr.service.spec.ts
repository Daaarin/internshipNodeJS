import { Test, TestingModule } from '@nestjs/testing'
import { CbrService } from './cbr.service'

describe('CbrService', () => {
  let service: CbrService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CbrService],
    }).compile()

    service = module.get<CbrService>(CbrService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
