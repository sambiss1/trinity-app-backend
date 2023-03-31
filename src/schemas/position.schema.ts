import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { Company } from './company.schema';

export type PositionDocument = HydratedDocument<Position>;

@Schema({
    timestamps: true,
})
export class Position {
    @Prop({ required: true })
    name: string;
    
    @Prop({ type: String, ref: "Company" })
    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Company" })
    company: Company
}


export const PositionSchema = SchemaFactory.createForClass(Position).plugin(softDeletePlugin);