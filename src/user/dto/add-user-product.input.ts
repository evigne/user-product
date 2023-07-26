import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class AddUserProductInput {
  @Field(() => ID)
  id: string;

  @Field(() => [ID])
  order: string[];
}
