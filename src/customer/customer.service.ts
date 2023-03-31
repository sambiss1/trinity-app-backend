import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Customer, CustomerDocument } from 'src/schemas/customer.schema';

@Injectable()
export class CustomerService {

  constructor(@InjectModel(Customer.name) private customerModel: SoftDeleteModel<CustomerDocument>) { }

  // Create customer
  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const createdCustomer = await new this.customerModel(createCustomerDto).save();
    return createdCustomer
  }

  // Find all customer
  async findAll() {
    return this.customerModel.find()
  }

  // Find one customer
  async findOne(id: string) {
    return await this.customerModel.findById(id).populate("extension")
  }

  // Retrieve delete data
  async findDeleted() {
    return await this.customerModel.find({ isDeleted: 1 })
  }

  // Update one
  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return await this.customerModel.updateOne({ id }, { $set: { ...updateCustomerDto } });

  }

  // Remove one
  async remove(id: string) {
    const deleted = this.customerModel.softDelete({ _id: id });
    return deleted;
  }


  // remove many 
  async deleteAll() {
    return await this.customerModel.deleteMany();
  }
}
