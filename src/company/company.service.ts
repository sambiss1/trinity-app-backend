import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company, CompanyDocument } from 'src/schemas/company.schema';

@Injectable()
export class CompanyService {
  constructor(@InjectModel(Company.name) private companyModel: Model<CompanyDocument>) { }

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

  // remove one company
  async remove(id: number) {
    return this.companyModel.deleteOne({ id });
  }
}
