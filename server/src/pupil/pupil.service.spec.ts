import { Test, TestingModule } from '@nestjs/testing';
import { PupilService } from './pupil.service';

describe('PupilService', () => {
  let service: PupilService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PupilService],
    }).compile();

    service = module.get<PupilService>(PupilService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
