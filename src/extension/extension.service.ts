import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateExtensionDto } from './dto/create-extension.dto';
import { UpdateExtensionDto } from './dto/update-extension.dto';
import { Extension, ExtensionDocument } from 'src/schemas/extension.schema';
import { SoftDeleteModel } from "soft-delete-plugin-mongoose";
import { Employee } from 'src/schemas/employee.schema';



@Injectable()
export class ExtensionService {

  constructor(@InjectModel(Extension.name) private extensionModel: SoftDeleteModel<ExtensionDocument>) { }

  // Create one
  async create(createExtensionDto: CreateExtensionDto): Promise<Extension> {
    const createdExtension = await new this.extensionModel(createExtensionDto).save();
    return createdExtension
  }

  // Find all
  async findAll() {
    return await this.extensionModel.find().populate([{ path: "company" }]);
  }
  // Find by company
  async findAllByCompany(company: string) {
    return await this.extensionModel.find().where({ company: company }).populate([{ path: "company" }]);
  }

  // Find one
  async findOne(id: string) {
    return await this.extensionModel.findOne({ id }).populate("company");
  }

  // Update one
  async update(id: string, Extension: Extension): Promise<Extension> {
    // return this.extensionModel.updateOne({ id }, { $set: { ...updateExtensionDto } });
    return await this.extensionModel.findByIdAndUpdate(id, Extension, { new: true })
  }

  // Remove one
  async remove(id: string) {
    const deleted = this.extensionModel.softDelete({ _id: id });
    return deleted;

    // return await this.extensionModel.deleteOne({ id });
  }

  // remove many 
  async deleteAll() {
    return await this.extensionModel.deleteMany();
  }
}
function next() {
  throw new Error('Function not implemented.');
}

