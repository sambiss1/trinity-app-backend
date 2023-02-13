import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Employee } from './employee.schema';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

export type PayrollListingDocument = HydratedDocument<PayrollListing>;

@Schema()
export class PayrollListing {
    @Prop({ required: true })
    year: string;

    @Prop({ required: true })
    month: string;

    @Prop()
    tax: string;

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }])
    employee: Employee;
}

export const PayrollListingSchema = SchemaFactory.createForClass(PayrollListing).plugin(softDeletePlugin);