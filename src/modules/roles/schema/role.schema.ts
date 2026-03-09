import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

export type RoleDocument = Role & Document;

@Schema({ timestamps: true })
export class Role {
    @Prop({ required: true, default: uuidv4 })
    entityId: string;  

    @Prop({ required: true })
    name: string;

    @Prop()
    description: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);