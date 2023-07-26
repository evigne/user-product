import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { CreateUserInput } from './dto/create-user.input';
import { Product } from '../product/entities/product.entity';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [
        UserService,
        UserResolver,

        // {
        //   provide: getRepositoryToken(Product),
        //   useClass: Repository<Product>,
        // },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
  });

  it('should create a new user', async () => {
    const userInput: CreateUserInput = {
      name: 'Vignesh',
      email: 'vignesh@gmail',
      age: 31,
    };
    // console.log('productservice', productService);
    const createduser = await userService.create(userInput);

    expect(createduser.name).toBe(userInput.name);
    expect(createduser.email).toBe(userInput.email);
    expect(createduser.id).toBeDefined();
  });
});
