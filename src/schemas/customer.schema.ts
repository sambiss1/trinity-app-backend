import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

export type CustomerDocument = HydratedDocument<Customer>;

@Schema()
export class Customer {
    @Prop({ required: true })
    name: string;

    @Prop()
    company: string;

    @Prop()
    address: string;


    @Prop()
    email: string;

    @Prop()
    phone: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer).plugin(softDeletePlugin);