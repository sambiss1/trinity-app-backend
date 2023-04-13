import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee, EmployeeDocument } from 'src/schemas/employee.schema';
import { SoftDeleteModel } from "soft-delete-plugin-mongoose";
import { ObjectId } from 'mongoose';
import mongoose from 'mongoose';


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

  // Find by extension
  async findByExtension(extension: string) {
    return await this.employeeModel.find().where({ extension }).populate([{ path: "extension" }, { path: "position" }])
  }

  // Get user by company
  async findByCompany(company: string) {
    return await this.employeeModel.find().where({ company: company }).populate([{ path: "extension" }, { path: "position" }])

  }

  // Find director by extension
  async findDirectorByExtension(extension: string, position: string) {
    return await this.employeeModel.findOne().where({ position: position, extension: extension }).populate([{ path: "extension" }, { path: "position" }])
  }

  // Find by Position
  async findByPosition(id: string) {
    return await this.employeeModel.find().where({ position: id }).populate([{ path: "extension" }])
  }

  // Get last inserted employees
  async findNewEmployees(company: string) {
    return await this.employeeModel.find().where({ company: company }).sort({ createdAt: -1 }).limit(10).populate([{ path: "extension" }, { path: "position" }])
  }

  // Count last inserted employees
  // Get last inserted employees
  async countNewEmployees(company: string) {
    return await this.employeeModel.find().where({ company: company }).sort({ createdAt: -1 }).count()
  }

  // A - Z
  async findAndSortByName(company: string) {
    return await this.employeeModel.find({ "extension": { company: company.toString() } }).where().sort({ name: 1 }).limit(10).populate([{ path: "extension" }, { path: "position" }])
  }

  async searchByName(name: string): Promise<Employee> {
    return await this.employeeModel.findOne().where({name: name}).populate([{ path: "extension" }])
  }


  async update(id: string, Employee: Employee): Promise<Employee> {
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
