import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { Customer } from './customer.schema';
import { Extension } from './extension.schema';
import { Task } from './task.schema';

export type InvoiceDocument = HydratedDocument<Invoice>;

@Schema({
    timestamps: true,
})
export class Invoice {
    @Prop({ required: true, unique: true })
    num: string;

    @Prop()
    period: string;

    @Prop()
    currency: string;

    @Prop([Number])
    quantity: number;

    @Prop([Number])
    unitPrice: number;
    

    @Prop([Number])
    totalPrice: number;

    @Prop()
    payed: boolean;

    @Prop()
    amount_due: number;

    @Prop()
    amount_paid: string;

    @Prop()
    payment_term: string;

    @Prop()
    date: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Customer" })
    customer: Customer

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Extension" })
    extension: Extension

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }])
    tasks: Task
}



export const InvoiceSchema = SchemaFactory.createForClass(Invoice).plugin(softDeletePlugin);