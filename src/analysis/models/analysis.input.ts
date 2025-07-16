import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class AnalysisInput {
  @Field(() => Int)
  documentId: number;
}
