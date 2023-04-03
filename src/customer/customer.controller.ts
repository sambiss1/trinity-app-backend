import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller("api/customers")
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

  // Post

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  // Get all
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  // Get 
  @UseGuards(AuthGuard('jwt'))
  @Get("/extension/:extension")
  findByExtension(@Param("extension") extension: string) {
    return this.customerService.findByExtension(extension);
  }

  // Get by company
  @UseGuards(AuthGuard('jwt'))
  @Get("/company/")
  findByCompany(@Query("company") company: string) {
    return this.customerService.findByCompany(company);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get("/new/")
  findNewCustomers() {
    return this.customerService.findNewCustomers()
  }

  @UseGuards(AuthGuard('jwt'))
  @Get("/new/count/")
  countNewCustomers() {
    return this.customerService.countNewCustomers()
  }

  // Get one
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  // Get deleted records
  @UseGuards(AuthGuard('jwt'))
  @Get("/deleted")
  findDeleted() {
    return this.customerService.findDeleted();
  }

  // Update one
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  // Delete one
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(id);
  }

  // Delete many
  @UseGuards(AuthGuard('jwt'))
  @Delete()
  deleteAll() {
    return this.customerService.deleteAll();
  }
}
