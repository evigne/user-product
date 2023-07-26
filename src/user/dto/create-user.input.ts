import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'User Name' })
  name: string;

  @Field(() => String, { description: 'User Email ID' })
  email: string;

  @Field(() => Int, { description: 'User Age' })
  age: number;
}
