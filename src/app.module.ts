import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyModule } from './company/company.module';


@Module({
  imports: [MongooseModule.forRoot(process.env.DB_CONNECTION), CompanyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}