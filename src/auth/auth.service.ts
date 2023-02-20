import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async validateUser(name: string, password: string): Promise<any> {
        const user = await this.userService.findOne(name);

        if (!user) return null;
        const passwordValid = await bcrypt.compare(password, user.password)
        if (!user) {
            throw new NotAcceptableException('could not find the user');
        }
        if (user && passwordValid) {
            return user;
        }
        return null;
        // if (user && user.password === password) {
        //     const { password, ...result } = user;
        //     return result;
        // }
        // return null;
    }


    async login(user: any) {
        const payload = { user: user, sub: user._id };
        return {
            user: payload.user,
            access_token: this.jwtService.sign(payload),
        };
    }
}
