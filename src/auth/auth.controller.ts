import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }
    @UseGuards(AuthGuard('local'))
    @Post('auth/login')
    async login(@Request() req, ) {
        return this.authService.login(req.user);
    }
}
