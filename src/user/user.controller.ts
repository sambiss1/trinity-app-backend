import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/signup')
  async createUser(
    // @Body('username') username: string,
    // @Body('password') password: string,
    // @Body() createUserDto: CreateUserDto,
    @Body() user: User
  ): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);
    const result = await this.userService.createUser(
      user.name,
      hashedPassword,
    );
    return result;
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // Get by company
  @Get(":company")
  findByCompany(@Param("company") company: string) {
    return this.userService.findByCompany(company);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(id, updateUserDto);
  // }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() user: User) {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Delete()
  deleteAll() {
    return this.userService.deleteAll();
  }

}
