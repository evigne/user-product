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

  /**
   * Mutation for Creating a Product
   * @param createUserInput
   * @returns  User
   */
  @Mutation(() => User, { name: 'createUser' })
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  /**
   * Query to Find All Users in the Database. Takes no Argument
   * @returns Array of Users
   */
  @Query(() => [User], { name: 'getUser' })
  findAll() {
    return this.userService.findAll();
  }

  /**
   * Query to Find single User by ID
   * @param id Takes user id ad input
   * @returns User
   */
  @Query(() => User, { name: 'getUserById' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOne(id);
  }

  /**
   * Mutation for updating a User
   * @param updateUserInput  Taskes user id and optional user fields as input
   * @returns User
   */
  @Mutation(() => User, { name: 'updateUser' })
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  /**
   * Mutation for Deleting a User
   * @param id Takes User id as input
   * @returns Boolean
   */
  @Mutation(() => User, { name: 'deleteUser' })
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.userService.remove(id);
  }

  /**
   * Mutation for adding Multiple products to user
   * @param addUserProducts
   * @returns User
   */
  @Mutation(() => User, { name: 'addUserProduct' })
  async addUserProduct(
    @Args('addUserProduct') addUserProducts: AddUserProductInput,
  ): Promise<User> {
    return this.userService.addUserProduct(addUserProducts);
  }
}
