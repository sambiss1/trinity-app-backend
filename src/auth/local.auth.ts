import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    // async validate(name: string, password: string): Promise<User> {
    //     const user = await this.authService.validateUser(name, password);
    //     if (!user) {
    //         throw new UnauthorizedException();
    //     }
    //     return user;
    // }
    async validate(user: User): Promise<User> {
        const authUser = await this.authService.validateUser(user.name, user.password);
        if (!authUser) {
            throw new UnauthorizedException();
        }
        return authUser;
    }
}