import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { Company } from './company.schema';

export type ServiceDocument = HydratedDocument<Service>;

@Schema({
    timestamps: true,
})
export class Service {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    type: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Company" })
    company: Company
}


export const ServiceSchema = SchemaFactory.createForClass(Service).plugin(softDeletePlugin);