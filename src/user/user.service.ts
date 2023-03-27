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
  constructor(@InjectModel("user") private readonly userModel: Model<UserDocument>) { }
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
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
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

  async findOne(name: string): Promise<any> {
    return this.userModel.find({ name });
  }
  // async findOne(query: object): Promise<any> {
  //   return this.userModel.find({ query });
  // }


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
  // sanitizeUser(user: User) {
  //   const sanitized = user.toObject();
  //   delete sanitized['password'];
  //   return sanitized;
  // }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
