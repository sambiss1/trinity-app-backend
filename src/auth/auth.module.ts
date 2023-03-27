import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose"
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from '@nestjs/jwt';
import { UserSchema } from 'src/schemas/user.schema';
import { LocalStrategy } from './local.auth';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({
    secret: 'secretKey',
    signOptions: { expiresIn: '60s' },
  }), MongooseModule.forFeature([{ name: "user", schema: UserSchema }])],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy]
})
export class AuthModule { }
