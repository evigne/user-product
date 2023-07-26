import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'Product ID' })
  id: string;

  @Column()
  @Field(() => String, { description: 'Name of the Product' })
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @Field(() => Float, { description: 'Product Price' })
  price: number;
}
