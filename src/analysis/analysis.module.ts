import { Module } from '@nestjs/common';
import { AnalysisResolver } from './resolvers/analysis.resolver';
import { AnalysisService } from './analysis.service';

@Module({
  providers: [AnalysisService, AnalysisResolver],
})
export class AnalysisModule {}
