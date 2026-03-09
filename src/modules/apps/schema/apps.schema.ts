import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type AppsDocument = Apps & Document;

@Schema({ timestamps: true, strict: false })
export class Apps {
    @Prop({ required: true, unique: true, default: uuidv4 })
    entityId: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ type: String, default: null })
    icon: string | null;
}

export const AppsSchema = SchemaFactory.createForClass(Apps);