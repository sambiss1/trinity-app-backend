import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee, EmployeeDocument } from 'src/schemas/employee.schema';
import { SoftDeleteModel } from "soft-delete-plugin-mongoose";


@Injectable()
export class EmployeeService {
  constructor(@InjectModel(Employee.name) private employeeModel: SoftDeleteModel<EmployeeDocument>) { }

  // Creat employee
  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const createdEmplyee = await new this.employeeModel(createEmployeeDto).save();
    return createdEmplyee
  }

  // Find all 
  async findAll() {
    return this.employeeModel.find().populate([{ path: "extension" }, { path: "position" }]);
  }

  // Find one
  async findOne(id: string): Promise<Employee> {
    return await this.employeeModel.findById(id).populate([{ path: "extension" }, { path: "position" }])
  }


  // Update one employee
  // async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
  //   return this.employeeModel.findByIdAndUpdate({ id }, { $set: { ...updateEmployeeDto } });
  // }

  async update(id: string, Employee: Employee): Promise<Employee> {
    // return this.employeeModel.findByIdAndUpdate({ id }, { $set: { ...Employee } });
    return await this.employeeModel.findByIdAndUpdate(id, Employee, { new: true })
  }

  // Remove one employee
  async remove(id: string) {
    const deleted = this.employeeModel.softDelete({ _id: id });
    return deleted;
  }

  async findDeleted() {
    return await this.employeeModel.find({ isDeleted: true })
  }

  // Remove many
  async deleteAll() {
    return this.employeeModel.deleteMany();
  }
}
