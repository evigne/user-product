import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../product/entities/product.entity';
import { ProductService } from '../product/product.service';
import { ProductModule } from '../product/product.module';

describe('UserService', () => {
  let service: UserService;
  let module: TestingModule;
  beforeEach(async () => {
    module = await Test.createTestingModule({
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
        // { provide: getRepositoryToken(User), useClass: Repository<User> },
        // { provide: getRepositoryToken(Product), useClass: Repository<Product> },
        // ProductModule,
      ],
    }).compile();
    service = module.get<UserService>(UserService);
  });

  afterEach(async () => {
    await module.close();
  });

  it('Should Create a new User', async () => {
    const userInput: CreateUserInput = {
      name: 'vignesh',
      email: 'vignesh@gmail.com',
      age: 30,
    };

    const createdUser = await service.create(userInput);

    expect(createdUser.name).toBe(userInput.name);
    expect(createdUser.email).toBe(userInput.email);
    expect(createdUser.age).toBe(userInput.age);
    expect(createdUser.id).toBeDefined();
  });
});
