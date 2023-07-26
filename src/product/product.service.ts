import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async create(createProductInput: CreateProductInput): Promise<Product> {
    // console.log('CreateREpo', this.productRepository);
    const product = this.productRepository.create(createProductInput);
    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product Not Found');
    }
    return product;
  }

  async update(
    id: string,
    updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product Not Found');
    }
    Object.assign(product, updateProductInput);
    return this.productRepository.save(product);
  }

  async remove(id: string): Promise<boolean> {
    const deleteProduct = await this.productRepository.delete(id);
    return deleteProduct.affected > 0;
  }

  async findManyProducts(ids: string[]): Promise<Product[]> {
    return this.productRepository.findBy({
      id: In(ids),
    });
  }
}
