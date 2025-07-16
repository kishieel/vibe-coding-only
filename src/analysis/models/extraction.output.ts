import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ExtractionOutput {
  @Field({ nullable: true })
  tables?: string;

  @Field({ nullable: true })
  forms?: string;

  @Field({ nullable: true })
  metadata?: string;
}
