import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class DocumentInput {
  @Field(() => Int)
  id: number;
}
