import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { AddUserProductInput } from './dto/add-user-product.input';
import { ProductService } from '../product/product.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly productService: ProductService,
  ) {}

  @Mutation(() => User, { name: 'createUser' })
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'getUser' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'getUserById' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User, { name: 'updateUser' })
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User, { name: 'deleteUser' })
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.userService.remove(id);
  }

  @Mutation(() => User, { name: 'addUserProduct' })
  async addUserProduct(
    @Args('addUserProduct') addUserProducts: AddUserProductInput,
  ): Promise<User> {
    return this.userService.addUserProduct(addUserProducts);
  }
}
