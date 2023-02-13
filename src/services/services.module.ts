import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ServicesController } from './services.controller';
import { Service, ServiceSchema } from 'src/schemas/services.schemas';
@Module({
  imports: [MongooseModule.forFeature([{ name: Service.name, schema: ServiceSchema }])],
  controllers: [ServicesController],
  providers: [ServicesService]
})
export class ServicesModule {}
