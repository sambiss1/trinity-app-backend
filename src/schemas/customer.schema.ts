import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { Task } from './task.schema';

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

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }])
    tasks: Task   
}

export const CustomerSchema = SchemaFactory.createForClass(Customer).plugin(softDeletePlugin);