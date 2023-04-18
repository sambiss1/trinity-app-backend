import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Extension } from './extension.schema';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { Position } from './position.schema';

export type EmployeeDocument = HydratedDocument<Employee>;

@Schema({
    timestamps: true,
})
export class Employee {
    @Prop({ required: true, unique: true })
    n_matricule: string;

    @Prop({ required: true })
    name: string;

    @Prop()
    address: string;

    @Prop({ unique: true })
    email: string;

    @Prop()
    phone_number: number;

    @Prop()
    civil_status: string;

    @Prop()
    number_of_child: number;

    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Position' })
    @Prop({ type: String, ref: 'Position' })
    position: Position;

    @Prop()
    salary: number;

    @Prop()
    prime: string;

    @Prop()
    family_allowance: number;

    @Prop()
    currency: string;

    @Prop({ type: String, ref: 'Extension' })
    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Extension' })
    extension: Extension;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee).plugin(softDeletePlugin);