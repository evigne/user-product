import { Test } from '@nestjs/testing';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateProductInput } from './dto/create-product.input';
import { Product } from './entities/product.entity';

describe('ProductService', () => {
  let productService: ProductService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Product]),
      ],
      providers: [
        ProductService,
        ProductResolver,

        // {
        //   provide: getRepositoryToken(Product),
        //   useClass: Repository<Product>,
        // },
      ],
    }).compile();

    productService = moduleRef.get<ProductService>(ProductService);
  });

  it('should create a new product', async () => {
    const productInput: CreateProductInput = {
      name: 'Sample Product',
      price: 10.99,
    };
    // console.log('productservice', productService);
    const createdProduct = await productService.create(productInput);

    expect(createdProduct.name).toBe(productInput.name);
    expect(createdProduct.price).toBe(productInput.price);
    expect(createdProduct.id).toBeDefined();
  });
});
