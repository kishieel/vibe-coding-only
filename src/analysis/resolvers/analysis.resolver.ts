import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AnalysisService } from '../analysis.service';
import { AnalysisInput } from '../models/analysis.input';
import { SummaryOutput } from '../models/summary.output';
import { KeywordsOutput } from '../models/keywords.output';
import { TopicsOutput } from '../models/topics.output';
import { SentimentOutput } from '../models/sentiment.output';
import { LanguageOutput } from '../models/language.output';
import { ClassificationOutput } from '../models/classification.output';
import { VectorSearchOutput } from '../models/vectorsearch.output';
import { ExtractionOutput } from '../models/extraction.output';

@Resolver()
export class AnalysisResolver {
  constructor(private readonly analysisService: AnalysisService) {}

  @Mutation(() => SummaryOutput)
  async summarize(@Args('input') input: AnalysisInput): Promise<SummaryOutput> {
    const summary = await this.analysisService.summarize(input.documentId);
    return { summary };
  }

  @Mutation(() => KeywordsOutput)
  async extractKeywords(
    @Args('input') input: AnalysisInput,
  ): Promise<KeywordsOutput> {
    const keywords = await this.analysisService.extractKeywords(
      input.documentId,
    );
    return { keywords };
  }

  @Mutation(() => TopicsOutput)
  async extractTopics(
    @Args('input') input: AnalysisInput,
  ): Promise<TopicsOutput> {
    const topics = await this.analysisService.extractTopics(input.documentId);
    return { topics };
  }

  @Mutation(() => SentimentOutput)
  async analyzeSentiment(
    @Args('input') input: AnalysisInput,
  ): Promise<SentimentOutput> {
    const sentiment = await this.analysisService.analyzeSentiment(
      input.documentId,
    );
    return { sentiment };
  }

  @Mutation(() => LanguageOutput)
  async detectLanguage(
    @Args('input') input: AnalysisInput,
  ): Promise<LanguageOutput> {
    const language = await this.analysisService.detectLanguage(
      input.documentId,
    );
    return { language };
  }

  @Mutation(() => ClassificationOutput)
  async classify(
    @Args('input') input: AnalysisInput,
  ): Promise<ClassificationOutput> {
    const result = await this.analysisService.classify(input.documentId);
    return { category: result.category, confidence: result.confidence };
  }

  @Mutation(() => VectorSearchOutput)
  async vectorSearch(
    @Args('query') query: string,
  ): Promise<VectorSearchOutput> {
    const results = await this.analysisService.vectorSearch(query);
    return { results };
  }

  @Mutation(() => ExtractionOutput)
  async extractStructured(
    @Args('input') input: AnalysisInput,
  ): Promise<ExtractionOutput> {
    const result = await this.analysisService.extractStructured(
      input.documentId,
    );
    return {
      tables: result.tables,
      forms: result.forms,
      metadata: result.metadata,
    };
  }
}
