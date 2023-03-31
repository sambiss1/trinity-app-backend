
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({
    timestamps: true,
})
export class Company {
    @Prop({ required: true })
    name: string;

    @Prop()
    logo: string;

    @Prop()
    rccm: string;

    @Prop()
    id_nat: string;

    @Prop()
    tax_number: string;

    
    @Prop()
    address: string;

    @Prop({ required: true })
    email: string;

    @Prop([String])
    phone_number: string[];
}

export const CompanySchema = SchemaFactory.createForClass(Company).plugin(softDeletePlugin);
