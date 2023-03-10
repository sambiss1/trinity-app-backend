import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee, EmployeeDocument } from 'src/schemas/employee.schema';
import { SoftDeleteModel } from "soft-delete-plugin-mongoose";


@Injectable()
export class EmployeeService {
  constructor(@InjectModel(Employee.name) private extensionModel: SoftDeleteModel<EmployeeDocument>) { }

  // Creat employee
  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const createdEmplyee = await new this.extensionModel(createEmployeeDto).save();
    return createdEmplyee
  }

  // Find all 
  async findAll() {
    return this.extensionModel.find().populate("extension");
  }

  // Find one
  async findOne(id: number) {
    return (await this.extensionModel.findOne({ id })).populate("extension")
    
  }


  // Update one employee
  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return this.extensionModel.updateOne({ id }, { $set: { ...updateEmployeeDto } });
  }

  // Remove one employee
  async remove(id: number) {
    const deleted = this.extensionModel.softDelete({ _id: id });
    return deleted;
  }

  // Remove many
  async deleteAll() {
    return this.extensionModel.deleteMany();
  }
}
