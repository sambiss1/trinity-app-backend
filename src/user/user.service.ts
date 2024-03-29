import {
  HttpException,
  HttpStatus
  , Injectable
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Model } from 'mongoose';
import { LoginDTO } from 'src/auth/dto/LoginDto';
import * as bcrypt from 'bcrypt';
import { Payload } from 'src/types/payload';

@Injectable()
export class UserService {
  constructor(@InjectModel("user") private readonly userModel: SoftDeleteModel<UserDocument>) { }
  async createUser(name: string, password: string): Promise<User> {
    return this.userModel.create({
      name,
      password,
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const createdUser = await new this.userModel(createUserDto).save();
    return createdUser;
  }

  async getUser(query: object): Promise<User> {
    return this.userModel.findOne({ query });
  }
  async findAll() {
    return await this.userModel.find();

  }

  async findByCompany(company: string) {
    return await this.userModel.find().where({ company: company });
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findOne({ id }).populate("company");
  }

  async findByLogin(UserDTO: LoginDTO) {
    const { name, password } = UserDTO;
    const user = await this.userModel.findOne({ name });
    if (!user) {
      throw new HttpException('user doesnt exists', HttpStatus.BAD_REQUEST);
    }
    if (await bcrypt.compare(password, user.password)) {
      return user;
    } else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
  }

  async findByPayload(payload: Payload) {
    const { name } = payload;
    return await this.userModel.findOne({ name });
  }

  // Update one
  async update(id: string, User: User) {
    return await this.userModel.findByIdAndUpdate(id, User, { new: true })
  }

  // Delete one
  async remove(id: string) {
    const deleted = this.userModel.softDelete({ _id: id });
    return deleted;
  }

  async deleteAll() {
    return await this.userModel.deleteMany();
  }

}
