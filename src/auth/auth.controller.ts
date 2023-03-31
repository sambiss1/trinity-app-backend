import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDTO } from './dto/LoginDto';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService, private userService: UserService,) { }

  // @UseGuards(AuthGuard('jwt'))
  @Post('/login')
  async login(@Body() UserDTO: LoginDTO) {
    const user = await this.userService.findByLogin(UserDTO);
    const payload = {
      name: user.name,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }





  // @Post('/login')
  // async login(@Body() UserDTO: LoginDTO, @Request() req) {
  //   return this.authService.login(req.user);
  // }
  // async login(@Body() UserDTO: LoginDTO) {
  //   const user = await this.userService.findByLogin(UserDTO);
  //   const payload = {
  //     user: user
  //   };
  //   const token = await this.authService.login(payload);
  //   return { user, token };
  // }

  // async login(@Body() user: User, @Request() req) {
  //   return this.authService.login(req.user);
  // }



  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
