import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  /**
   * Mutation for Creating a Product
   * @param createProductInput
   * @returns Product
   */
  @Mutation(() => Product, { name: 'createProduct' })
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productService.create(createProductInput);
  }

  /**
   * Mutation For Creating Multiple Products (Product Bulk)
   * @param inputs Takes the array of [Products] as input
   * @returns Array of Products
   */
  @Mutation(() => [Product])
  createBulkProducts(
    @Args('inputs', { type: () => [CreateProductInput] })
    inputs: CreateProductInput[],
  ) {
    return this.productService.createBulk(inputs);
  }

  /**
   * Query to Find All Products in the Database. Takes no Argument
   * @returns Array of Products
   */
  @Query(() => [Product], { name: 'getProduct' })
  findAll() {
    return this.productService.findAll();
  }

  /**
   * Query to Find single Product by ID
   * @param id Takes Product ID as Input
   * @returns  Product
   */
  @Query(() => Product, { name: 'getProductById' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.productService.findOne(id);
  }

  /**
   * Mutation for Updating a Product
   * @param updateProductInput Takes product id and other optional fields(product.name, product.price)
   * @returns  Product
   */
  @Mutation(() => Product, { name: 'updateProduct' })
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productService.update(
      updateProductInput.id,
      updateProductInput,
    );
  }

  /**
   * Mutation for Deleting a Product
   * @param id Takes Product ID as Input
   * @returns Boolean
   */
  @Mutation(() => Product, { name: 'deleteProduct' })
  removeProduct(@Args('id', { type: () => String }) id: string) {
    return this.productService.remove(id);
  }
}
