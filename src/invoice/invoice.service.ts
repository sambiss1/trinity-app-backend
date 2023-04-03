import { Injectable, Scope } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Invoice, InvoiceDocument } from 'src/schemas/invoice.schema';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';



// { scope: Scope.REQUEST }
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
    return this.invoiceModel.find().populate("customer extension tasks");
  }


  // Find one
  // async findOneById(id: string): Promise<Invoice> {
  //   console.log({ id })
  //   return await this.invoiceModel.findOne({ where: { _id: id } }).exec()

  //   // .populate("customer extension tasks");
  // }

  async findThisById(id: string) {
    return await this.invoiceModel.findById(id).populate("customer extension tasks");
  }

  // Find customers invoice
  async findByCustomer(customer: string) {
    return await this.invoiceModel.find().where({ customer }).populate("customer extension tasks");
  }

  async findInvoiceTask(tasks: string) {
    return await this.invoiceModel.find().where({ tasks }).populate("customer extension tasks");
  }

  // Find extension invoice
  async findExtensionInvoice(extension: string) {
    return this.invoiceModel.find().where({ extension }).populate(["customer", "extension"]);
  }

  // Get last inserted Customers
  async countNewInvoices() {
    return await this.invoiceModel.countDocuments().sort({ createdAt: -1 }).count()
  }

  // Update one
  async update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    return await this.invoiceModel.updateOne({ id }, { $set: { ...updateInvoiceDto } });
  }

  // Remove one
  remove(id: string) {
    const deleted = this.invoiceModel.softDelete({ _id: id });
    return deleted;
  }

  // Remove many
  async deleteAll() {
    return await this.invoiceModel.deleteMany();
  }
}
