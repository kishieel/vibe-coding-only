import { Module } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { AnalysisListener } from './analysis.listener';

@Module({
  providers: [AnalysisService, AnalysisListener],
})
export class AnalysisModule {}
