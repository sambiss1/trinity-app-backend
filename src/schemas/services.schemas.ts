import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

export type ServiceDocument = HydratedDocument<Service>;

@Schema()
export class Service {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    type: string;
}

export const ServiceSchema = SchemaFactory.createForClass(Service).plugin(softDeletePlugin);