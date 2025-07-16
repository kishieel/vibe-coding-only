import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class VectorSearchResult {
  @Field(() => Int)
  documentId: number;

  @Field()
  score: number;
}

@ObjectType()
export class VectorSearchOutput {
  @Field(() => [VectorSearchResult])
  results: VectorSearchResult[];
}
