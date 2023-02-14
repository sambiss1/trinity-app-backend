import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Invoice, InvoiceDocument } from 'src/schemas/invoice.schema';

@Injectable()
export class InvoiceService {


  constructor(@InjectModel(Invoice.name) private invoiceModel: SoftDeleteModel<InvoiceDocument>) { }

  // Create invoice
  async create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    const createdInvoice = await new this.invoiceModel(createInvoiceDto).save();
    return createdInvoice;
  }

  // Find all
  async findAll() {
    return this.invoiceModel.find().populate("customer");
  }

  // Find one
  async findOne(id: number) {
    return await this.invoiceModel.findOne({ id }).populate("customer");
  }

  // Update one
  async update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    return await this.invoiceModel.updateOne({ id }, { $set: { ...updateInvoiceDto } });
  }

  // Remove one
  remove(id: number) {
    const deleted = this.invoiceModel.softDelete({ _id: id });
    return deleted;
  }

  // Remove many
  async deleteAll() {
    return await this.invoiceModel.deleteMany();
  }
}
