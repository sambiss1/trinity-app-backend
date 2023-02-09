import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExtensionService } from './extension.service';
import { ExtensionController } from './extension.controller';
import { Extension, ExtensionSchema } from 'src/schemas/extension.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Extension.name, schema: ExtensionSchema }])],
  controllers: [ExtensionController],
  providers: [ExtensionService]
})
export class ExtensionModule { }
