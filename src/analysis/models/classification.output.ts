import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class ClassificationOutput {
  @Field()
  category: string;

  @Field(() => Float)
  confidence: number;
}
