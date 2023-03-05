
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { Extension } from './extension.schema';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { Company } from './company.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({
    timestamps: true,
})
export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    email: string;

    @Prop()
    rule: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true })
    company: Company
}

export const UserSchema = SchemaFactory.createForClass(User).plugin(softDeletePlugin);