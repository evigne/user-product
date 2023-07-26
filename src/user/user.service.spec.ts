import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../product/entities/product.entity';
import { ProductService } from '../product/product.service';
import { AddUserProductInput } from './dto/add-user-product.input';
import { CreateProductInput } from 'src/product/dto/create-product.input';

describe('UserService', () => {
  let userService: UserService;
  let productService: ProductService;
  let module: TestingModule;
  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [User, Product],
          synchronize: true,
        }),

        TypeOrmModule.forFeature([User, Product]),
      ],
      providers: [
        UserService,
        UserResolver,
        // { provide: getRepositoryToken(User), useClass: Repository<User> },
        // { provide: getRepositoryToken(Product), useClass: Repository<Product> },
        ProductService,
      ],
    }).compile();
    userService = module.get<UserService>(UserService);
    productService = module.get<ProductService>(ProductService);
  });

  it('Should Create a new User', async () => {
    const userInput: CreateUserInput = {
      name: 'vignesh',
      email: 'vignesh@gmail.com',
      age: 30,
    };

    const createdUser = await userService.create(userInput);

    expect(createdUser.name).toBe(userInput.name);
    expect(createdUser.email).toBe(userInput.email);
    expect(createdUser.age).toBe(userInput.age);
    expect(createdUser.id).toBeDefined();
  });

  it('Should Add Products to a User', async () => {
    //Create a User
    const userInput: CreateUserInput = {
      name: 'Vignesh',
      email: 'vignesh@mail.com',
      age: 30,
    };
    const createdUser = await userService.create(userInput);

    // Create a Product
    const product: CreateProductInput = {
      name: 'Airpods',
      price: 10.99,
    };

    const createdProduct = await productService.create(product);
    const input: AddUserProductInput = {
      id: createdUser.id,
      order: [createdProduct.id],
    };

    const addProduct = await userService.addUserProduct(input);
    expect(addProduct.order.length).toBe(1);
    expect(addProduct.order[0].id).toBe(createdProduct.id);
    expect(addProduct.order[0].name).toBe('Airpods');
  });
});
