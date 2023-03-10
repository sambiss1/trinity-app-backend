import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Controller("api/invoice")
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) { }

  // post one
  @Post()
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceService.create(createInvoiceDto);
  }

  // get all 
  @Get()
  findAll() {
    return this.invoiceService.findAll();
  }

  // Find extension invoice
  @Get(":extension")
  findExtensionInvoice(@Param('extension') extension: string) {
    return this.invoiceService.findExtensionInvoice(extension);
  }

  // Get one
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceService.findOne(+id);
  }

  // Update one
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoiceService.update(+id, updateInvoiceDto);
  }

  // Delete one
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoiceService.remove(+id);
  }


  // Delete all
  @Delete()
  deleteAll() {
    return this.invoiceService.deleteAll();
  }
}
