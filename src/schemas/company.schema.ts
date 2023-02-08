
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema()
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

    @Prop()
    email: string;

    @Prop([String])
    phone_number: string[];
}

export const CompanySchema = SchemaFactory.createForClass(Company);
