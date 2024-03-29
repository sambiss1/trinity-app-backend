import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Service, ServiceDocument } from 'src/schemas/services.schemas';

@Injectable()
export class ServicesService {

  constructor(@InjectModel(Service.name) private serviceModel: SoftDeleteModel<ServiceDocument>) { }

  // Create service
  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const createdService = await new this.serviceModel(createServiceDto).save();
    return createdService
  }


  // Find all
  async findAll() {
    return await this.serviceModel.find().populate("company");
  }

  // Find by company
  async findByCompany(company: string) {
    return await this.serviceModel.find().where({ company }).populate("company");
  }



  // Find one
  async findOne(id: string): Promise<Service> {
    return await this.serviceModel.findById(id).populate("company")
  }

  // Update one
  async update(id: string, Service: Service): Promise<Service> {
    // return await this.serviceModel.findByIdAndUpdate({ id }, { $set: { ...updateServiceDto } });
    return await this.serviceModel.findByIdAndUpdate(id, Service, { new: true });
  }

  // Remove one
  remove(id: string) {
    const deleted = this.serviceModel.softDelete({ _id: id });
    return deleted;
  }

  // Remove many
  async deleteAll() {
    return await this.serviceModel.deleteMany();
  }
}
