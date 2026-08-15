import { Test, TestingModule } from '@nestjs/testing';
import { CultivationLogsController } from './cultivation-logs.controller';
import { CultivationLogsService } from './cultivation-logs.service';

describe('CultivationLogsController', () => {
  let controller: CultivationLogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CultivationLogsController],
      providers: [CultivationLogsService],
    }).compile();

    controller = module.get<CultivationLogsController>(CultivationLogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
