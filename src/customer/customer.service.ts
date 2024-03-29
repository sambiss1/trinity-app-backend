import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Customer, CustomerDocument } from 'src/schemas/customer.schema';
import { ObjectId } from 'mongoose';

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

  // Find all customers by extension
  async findByExtension(extension: string) {
    return this.customerModel.find().where({ extension }).populate("extension")
  }


  async findByCompany(company: string) {
    return this.customerModel.find({ company }).populate("extension")
  }


  // Get last inserted Customers
  async findNewCustomers() {
    return await this.customerModel.find().sort({ createdAt: -1 }).limit(10).populate("extension")
  }

  // Count last inserted Customers
  // Get last inserted Customers
  async countNewCustomers() {
    return await this.customerModel.countDocuments().sort({ createdAt: -1 }).limit(10).count()
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
