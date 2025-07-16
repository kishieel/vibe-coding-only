import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SummaryOutput {
  @Field()
  summary: string;
}
