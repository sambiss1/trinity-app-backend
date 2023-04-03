import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Service } from "./services.schemas";
import { Employee } from './employee.schema';
import { Customer } from "./customer.schema";
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema({
    timestamps: true,
})
export class Task {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop()
    start_date: Date;

    @Prop()
    due_date: Date;

    @Prop()
    status: number;

    @Prop()
    price: number;

    @Prop()
    curreny: string;

    @Prop({ type: String, ref: 'Service' })
    service: Service;

    @Prop([{ type: String, ref: "Employee" }])
    taskers: Employee

    @Prop({ type: String, ref: "Customer" })
    customer: Customer
}

export const TaskSchema = SchemaFactory.createForClass(Task).plugin(softDeletePlugin);