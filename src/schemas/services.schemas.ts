import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

export type ServicesDocument = HydratedDocument<Services>;

@Schema()
export class Services {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    type: string;
}

export const ServicesSchema = SchemaFactory.createForClass(Services).plugin(softDeletePlugin);