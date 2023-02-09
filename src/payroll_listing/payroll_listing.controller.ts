import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PayrollListingService } from './payroll_listing.service';
import { CreatePayrollListingDto } from './dto/create-payroll_listing.dto';
import { UpdatePayrollListingDto } from './dto/update-payroll_listing.dto';

@Controller('payroll-listing')
export class PayrollListingController {
  constructor(private readonly payrollListingService: PayrollListingService) {}

  @Post()
  create(@Body() createPayrollListingDto: CreatePayrollListingDto) {
    return this.payrollListingService.create(createPayrollListingDto);
  }

  @Get()
  findAll() {
    return this.payrollListingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payrollListingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePayrollListingDto: UpdatePayrollListingDto) {
    return this.payrollListingService.update(+id, updatePayrollListingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.payrollListingService.remove(+id);
  }
}
