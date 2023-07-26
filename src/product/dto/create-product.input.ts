import { InputType, Field } from '@nestjs/graphql';
import { IsNumber, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateProductInput {
  @MinLength(1)
  @IsString()
  @Field(() => String, { description: 'User Name' })
  name: string;

  @IsNumber()
  @Field()
  price: number;
}
