
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { Extension } from './extension.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({
    timestamps: true,
})
export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    rule: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Extension", required: true })
    extension: Extension
}

export const UserSchema = SchemaFactory.createForClass(User);