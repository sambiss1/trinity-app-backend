import { Injectable } from '@nestjs/common';
import { CreatePayrollListingDto } from './dto/create-payroll_listing.dto';
import { UpdatePayrollListingDto } from './dto/update-payroll_listing.dto';
import { SoftDeleteModel } from "soft-delete-plugin-mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { PayrollListing, PayrollListingDocument } from 'src/schemas/payrollListing.schema';

@Injectable()
export class PayrollListingService {
  constructor(@InjectModel(PayrollListing.name) private payrollListingModel: SoftDeleteModel<PayrollListingDocument>) { }

  //  Create payroll
  async create(createPayrollListingDto: CreatePayrollListingDto): Promise<PayrollListing> {
    const createdPayrollListing = await new this.payrollListingModel(createPayrollListingDto).save();
    return createdPayrollListing
  }

  // Find all listing
  async findAll() {
    return await this.payrollListingModel.find().populate("employee");
  }

  // Find one
  async findOne(id: number) {
    return await this.payrollListingModel.findOne({ id }).populate("company");
  }

  // Update one
  update(id: number, updatePayrollListingDto: UpdatePayrollListingDto) {
    return this.payrollListingModel.updateOne({ id }, { $set: { ...updatePayrollListingDto } });
  }

  // Remove one
  remove(id: number) {
    const deleted = this.payrollListingModel.softDelete({ _id: id });
    return deleted;
  }

  // remove many 
  async deleteAll() {
    return await this.payrollListingModel.deleteMany();
  }
}
