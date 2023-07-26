import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product } from '../../product/entities/product.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'User ID' })
  id: string;

  @Column()
  @Field(() => String, { description: 'User Name' })
  name: string;

  @Column()
  @Field(() => String, { description: 'User email ID' })
  email: string;

  @Column()
  @Field(() => Int, { description: 'User Age' })
  age: number;

  @ManyToMany(() => Product, { cascade: true })
  @JoinTable()
  @Field(() => [Product], { defaultValue: [] })
  order: Product[];

  addProducts(products: Product[]) {
    if (!this.order) {
      this.order = [];
    }
    this.order.push(...products);
  }
}
