import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel("user") private readonly userModel: Model<UserDocument>) { }
  async createUser(name: string, password: string): Promise<User> {
    return this.userModel.create({
      name,
      password,
    });
  }
  async getUser(query: object): Promise<User> {
    return this.userModel.findOne({ query });
  }
  async findAll() {
    return await this.userModel.find();

  }

  async findOne(username: string): Promise<any> {
    return this.userModel.find({username});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
