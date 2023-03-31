import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyModule } from './company/company.module';
import { ExtensionModule } from './extension/extension.module';
import { EmployeeModule } from './employee/employee.module';
import { PayrollListingModule } from './payroll_listing/payroll_listing.module';
import { CustomerModule } from './customer/customer.module';
import { ServicesModule } from './services/services.module';
import { TaskModule } from './task/task.module';
import { InvoiceModule } from './invoice/invoice.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PositionModule } from './position/position.module';
require('dotenv').config();




@Module({
  imports: [MongooseModule.forRoot(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}?retryWrites=true&w=majority`), CompanyModule, ExtensionModule, EmployeeModule, PayrollListingModule, CustomerModule, ServicesModule, TaskModule, InvoiceModule, UserModule, AuthModule, PositionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }