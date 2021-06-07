import { Document, Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = User & Document;

@Schema({})
export class User {
    @Prop()
    _id: Types.ObjectId;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: '' })
    bio: string;

    @Prop({ default: '' })
    image: string;
}

export const UserSchema = SchemaFactory.createForClass(User);