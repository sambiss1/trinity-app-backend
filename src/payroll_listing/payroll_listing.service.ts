import { Injectable } from '@nestjs/common';
import { CreatePayrollListingDto } from './dto/create-payroll_listing.dto';
import { UpdatePayrollListingDto } from './dto/update-payroll_listing.dto';

@Injectable()
export class PayrollListingService {
  create(createPayrollListingDto: CreatePayrollListingDto) {
    return 'This action adds a new payrollListing';
  }

  findAll() {
    return `This action returns all payrollListing`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payrollListing`;
  }

  update(id: number, updatePayrollListingDto: UpdatePayrollListingDto) {
    return `This action updates a #${id} payrollListing`;
  }

  remove(id: number) {
    return `This action removes a #${id} payrollListing`;
  }
}
