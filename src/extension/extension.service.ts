import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateExtensionDto } from './dto/create-extension.dto';
import { UpdateExtensionDto } from './dto/update-extension.dto';
import { Extension, ExtensionDocument } from 'src/schemas/extension.schema';

@Injectable()
export class ExtensionService {

  constructor(@InjectModel(Extension.name) private extensionModel: Model<ExtensionDocument>) { }

  // Create one
  async create(createExtensionDto: CreateExtensionDto): Promise<Extension> {
    const createdExtension = await new this.extensionModel(createExtensionDto).save();
    return createdExtension
  }

  // Find all
  async findAll() {
    return await this.extensionModel.find().populate("company");
  }

  // Find one
  async findOne(id: number) {
    return await this.extensionModel.findOne({ id }).populate("company");

  }

  // Update one
  async update(id: number, updateExtensionDto: UpdateExtensionDto) {
    return this.extensionModel.updateOne({ id }, { $set: { ...updateExtensionDto } });
  }

  // Remove one
  async remove(id: number) {
    return await this.extensionModel.deleteOne({ id });
  }

  // remove many 
  async deleteAll() {
    return await this.extensionModel.deleteMany();
  }
}
