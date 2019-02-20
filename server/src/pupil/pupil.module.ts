import { Module } from '@nestjs/common';
import { PupilService } from './pupil.service';
import { PupilController } from './pupil.controller';

@Module({
  providers: [PupilService],
  controllers: [PupilController]
})
export class PupilModule {}
