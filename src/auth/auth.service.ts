import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/schemas/user.schema';
import { Payload } from 'src/types/payload';
import { sign } from 'jsonwebtoken';


@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) { }
  // async validateUser(name: string, password: string): Promise<User> {
  //   const user = await this.userService.getUser({ name });
  //   if (!user) return null;
  //   const passwordValid = await bcrypt.compare(password, user.password)
  //   if (!user) {
  //     throw new NotAcceptableException('could not find the user');
  //   }
  //   if (user && passwordValid) {
  //     return user;
  //   }
  //   return null;
  // // }
  // async validateUser(user: User): Promise<User> {
  //   console.log(user.name, user.password);
  //   const authUser = await this.userService.findOne(user.name);
  //   return authUser
    // const authUser = await this.userService.findOne(name);
    // if (!authUser) return null;
    // const passwordValid = await bcrypt.compare(password, authUser.password)
    // if (!authUser) {
    //   throw new NotAcceptableException('could not find the user');
    // }
    // if (authUser && passwordValid) {
    //   return authUser;
    // }
    // return null;
  // }
  // async validateUser(username: string, pass: string): Promise<any> {
  //   const user = await this.userService.findOne(username);
  //   if (!user) return null;
  //   // const passwordValid = await bcrypt.compare(pass, user.password)
  //   if (user && user.password === pass) {
  //     console.log({ pass }, user.name, user.password)
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }
  // async validateUser(username: string, pass: string): Promise<any> {
  //   const user = await this.userService.findOne(username);
  //   const passwordValid = await bcrypt.compare(pass, user.password)
  //   if (user && user.password === pass) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }
  async login(user: any) {
    const payload = { username: user.name, sub: user._id };
    return {
      user: payload.username,
      access_token: this.jwtService.sign(payload),
    };
  }


  async signPayload(payload: Payload) {
    // return this.jwtService.sign(payload,'process.env.SECRET_KEY', { expiresIn: '7d' });
    return sign(payload, "process.env.SECRET_KEY", { expiresIn: '7d' });
  }

  async validateUser(payload: Payload) {
    return await this.userService.findByPayload(payload);
  }


  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
