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
import * as dotenv from 'dotenv';



@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://sambiss:s1Zzy851rLHlCnT7@cluster0.r6acpho.mongodb.net/?retryWrites=true&w=majority"), CompanyModule, ExtensionModule, EmployeeModule, PayrollListingModule, CustomerModule, ServicesModule, TaskModule, InvoiceModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}