import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Extension } from './extension.schema';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

export type EmployeeDocument = HydratedDocument<Employee>;

@Schema({
    timestamps: true,
})
export class Employee {
    @Prop({ required: true })
    n_matricule: string;

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

    @Prop()
    position: string;

    @Prop()
    salary: number;

    @Prop()
    prime: string;

    @Prop()
    family_allowance: number;

    @Prop()
    currency: string; 

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Extension' })
    extension: Extension;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee).plugin(softDeletePlugin);