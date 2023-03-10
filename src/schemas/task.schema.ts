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

    @Prop([String])
    substasks: string[];

    @Prop()
    start_date: string;

    @Prop()
    due_date: string;

    @Prop()
    status: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Service' })
    service: Service;

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }])
    taskers: Employee

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: "Customer" }])
    customer: Customer
}

export const TaskSchema = SchemaFactory.createForClass(Task).plugin(softDeletePlugin);