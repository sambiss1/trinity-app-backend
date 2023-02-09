
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose'
import { Company } from './company.schema';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';


export type ExtensionDocument = HydratedDocument<Extension>;

@Schema()
export class Extension {
    @Prop({ required: true })
    name: string;

    @Prop()
    location: string;

    @Prop()
    director: string;

    @Prop()
    slug: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Company' })
    company: Company;
}

export const ExtensionSchema = SchemaFactory.createForClass(Extension).plugin(softDeletePlugin);
