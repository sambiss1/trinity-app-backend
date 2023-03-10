import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { Task } from './task.schema';

export type CustomerDocument = HydratedDocument<Customer>;

@Schema({
    timestamps: true,
})
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