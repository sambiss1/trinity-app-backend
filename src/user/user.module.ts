import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose"
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from 'src/schemas/user.schema';



@Module({

  imports: [MongooseModule.forFeature([{ name: "user", schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
