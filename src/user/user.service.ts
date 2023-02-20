import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  User: any;
  constructor(@InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>) { }

  async create(name: string, password: string): Promise<User> {
    return await this.userModel.create(
      {
        name, password
      }
    );
  }

  findAll() {
    return this.userModel.find()
      // .populate("extension")
  }

  // async findOne(query: object): Promise<User> {
  //   return this.userModel.findOne(query);
  // }

  async findOne(id: string): Promise<User | undefined> {
    return this.userModel.findOne({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne({ id }, { $set: { ...updateUserDto } });
  }

  remove(id: number) {
    const deleted = this.userModel.softDelete({ _id: id });
    return deleted;
  }
}
