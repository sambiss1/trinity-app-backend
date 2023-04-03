import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller("api/invoices")
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) { }

  // post one
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceService.create(createInvoiceDto);
  }

  // get all 
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.invoiceService.findAll();
  }

  // Find extension invoice
  @UseGuards(AuthGuard('jwt'))
  @Get(":extension")
  findExtensionInvoice(@Param('extension') extension: string) {
    return this.invoiceService.findExtensionInvoice(extension);
  }


  @UseGuards(AuthGuard('jwt'))
  @Get("/new/count")
  countNewInvoices() {
    return this.invoiceService.countNewInvoices()
  }

  // Find customer invoices 
  @UseGuards(AuthGuard('jwt'))
  @Get("/customer/:customer")
  findByCustomer(@Param('customer') customer: string) {
    return this.findByCustomer(customer)
  }

  // Get one
  @UseGuards(AuthGuard('jwt'))
  @Get('/:id/:num')
  findOneById(@Param('id') id: string,
    @Param('num') num: string) {
    return this.invoiceService.findOneById(id, num)
  }



  // Update one
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoiceService.update(id, updateInvoiceDto);
  }

  // Delete one
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoiceService.remove(id);
  }

  // Delete all
  @UseGuards(AuthGuard('jwt'))
  @Delete()
  deleteAll() {
    return this.invoiceService.deleteAll();
  }
}
