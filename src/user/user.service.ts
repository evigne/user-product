import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { In, Repository } from 'typeorm';
import { AddUserProductInput } from './dto/add-user-product.input';
import { Product } from '../product/entities/product.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}
  async create(createUserInput: CreateUserInput): Promise<User> {
    const product = this.userRepository.create(createUserInput);
    return this.userRepository.save(product);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['order'] });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['order'],
    });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return user;
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    const product = await this.userRepository.findOne({
      where: { id },
      relations: ['order'],
    });
    if (!product) {
      throw new NotFoundException('User Not Found');
    }
    Object.assign(product, updateUserInput);
    return this.userRepository.save(product);
  }

  async remove(id: string): Promise<boolean> {
    const deleteUser = await this.userRepository.delete(id);
    return deleteUser.affected > 0;
  }

  async addUserProduct(
    addUserProductInput: AddUserProductInput,
  ): Promise<User> {
    const { id, order } = addUserProductInput;

    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['order'],
    });

    const products = await this.productRepository.findBy({
      id: In(order),
    });

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    user.addProducts(products);

    return this.userRepository.save(user);
  }
}
