import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { Customer } from './customer.schema';
import { Extension } from './extension.schema';

export type InvoiceDocument = HydratedDocument<Invoice>;

@Schema({
    timestamps: true,
})
export class Invoice {
    @Prop({ required: true })
    num: string;

    @Prop()
    period: string;

    @Prop()
    currency: string;

    @Prop()
    payed: boolean;

    @Prop()
    amount_due: string;

    @Prop()
    amount_paid: string;

    @Prop()
    payment_term: string;

    @Prop()
    date: string;

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: "Customer" }])
    customer: Customer

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Extension" })
    extension: Extension
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice).plugin(softDeletePlugin);