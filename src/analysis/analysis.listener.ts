import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AnalysisService } from './analysis.service';

@Injectable()
export class AnalysisListener {
  constructor(private readonly analysisService: AnalysisService) {}

  @OnEvent('document.uploaded')
  async handleDocumentUploaded(payload: { documentId: number }): Promise<void> {
    await this.analysisService.process(payload.documentId);
  }
}
