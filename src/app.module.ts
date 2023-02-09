import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyModule } from './company/company.module';
import { ExtensionModule } from './extension/extension.module';
import { EmployeeModule } from './employee/employee.module';
import * as dotenv from 'dotenv';



@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://sambiss:s1Zzy851rLHlCnT7@cluster0.r6acpho.mongodb.net/?retryWrites=true&w=majority"), CompanyModule, ExtensionModule, EmployeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}