import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PayrollListingService } from './payroll_listing.service';
import { CreatePayrollListingDto } from './dto/create-payroll_listing.dto';
import { UpdatePayrollListingDto } from './dto/update-payroll_listing.dto';

@Controller('payroll-listing')
export class PayrollListingController {
  constructor(private readonly payrollListingService: PayrollListingService) {}

  // Post new
  @Post()
  create(@Body() createPayrollListingDto: CreatePayrollListingDto) {
    return this.payrollListingService.create(createPayrollListingDto);
  }

  // Get all
  @Get()
  findAll() {
    return this.payrollListingService.findAll();
  }

  // Get one
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payrollListingService.findOne(+id);
  }

  // Update one
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePayrollListingDto: UpdatePayrollListingDto) {
    return this.payrollListingService.update(+id, updatePayrollListingDto);
  }

  // Delete one
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.payrollListingService.remove(+id);
  }


  //Delete Manye  
  @Delete()
  deleteAll() {
    return this.payrollListingService.deleteAll();
  }
}
