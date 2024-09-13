import { Test, TestingModule } from '@nestjs/testing';
import { AeroportoController } from '../aeroporto.controller';

describe('AeroportoController', () => {
  let controller: AeroportoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AeroportoController],
    }).compile();

    controller = module.get<AeroportoController>(AeroportoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
