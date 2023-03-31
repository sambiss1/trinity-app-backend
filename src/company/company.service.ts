import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company, CompanyDocument } from 'src/schemas/company.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';


@Injectable()
export class CompanyService {
  constructor(@InjectModel(Company.name) private companyModel: SoftDeleteModel<CompanyDocument>) { }

  //  add or create new company
  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const createdCompany = new this.companyModel(createCompanyDto);
    return createdCompany.save();
  }

  // Find all companies
  async findAll() {
    return this.companyModel.find();
  }

  // Find one company
  async findOne(id: number) {
    return this.companyModel.findOne({ id });
  }

  // Update one company
  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return this.companyModel.updateOne({ id }, { $set: { ...updateCompanyDto } });
  }

  // Delete one
  async remove(id: string) {
    const deleted = this.companyModel.softDelete({ _id: id });
    return deleted;
  }

  async deleteAll() {
    return this.companyModel.deleteMany()
  }
}
