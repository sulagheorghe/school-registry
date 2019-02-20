import { Test, TestingModule } from '@nestjs/testing';
import { PupilController } from './pupil.controller';

describe('Pupil Controller', () => {
  let controller: PupilController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PupilController],
    }).compile();

    controller = module.get<PupilController>(PupilController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
