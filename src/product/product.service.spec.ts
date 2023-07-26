import { Test } from '@nestjs/testing';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateProductInput } from './dto/create-product.input';
import { Product } from './entities/product.entity';

describe('ProductService', () => {
  let productService: ProductService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Product]),
      ],
      providers: [ProductService, ProductResolver],
    }).compile();

    productService = module.get<ProductService>(ProductService);
  });

  it('should create a new product', async () => {
    const productInput: CreateProductInput = {
      name: 'Sample Product',
      price: 10.99,
    };

    const createdProduct = await productService.create(productInput);

    expect(createdProduct.name).toBe(productInput.name);
    expect(createdProduct.price).toBe(productInput.price);
    expect(createdProduct.id).toBeDefined();
  });
});
