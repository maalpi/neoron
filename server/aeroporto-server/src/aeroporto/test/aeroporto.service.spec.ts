import { Test, TestingModule } from '@nestjs/testing';
import { AeroportoService } from '../aeroporto.service';

describe('AeroportoService', () => {
  let service: AeroportoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AeroportoService],
    }).compile();

    service = module.get<AeroportoService>(AeroportoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
