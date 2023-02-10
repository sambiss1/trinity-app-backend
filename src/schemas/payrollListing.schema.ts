import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Employee } from './employee.schema';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

export type PayrollListingDocument = HydratedDocument<PayrollListing>;

@Schema()
export class PayrollListing {
    @Prop({ required: true })
    month: string;

    @Prop({ required: true })
    name: string;

    @Prop()
    address: string;

    @Prop()
    email: string;

    @Prop()
    phone_number: string;

    @Prop()
    civil_status: string;

    @Prop()
    number_of_child: number;


    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }])
    employee: Employee;
}

export const PayrollListingSchema = SchemaFactory.createForClass(PayrollListing).plugin(softDeletePlugin);