import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type TenantsDocument = Tenants & Document;

@Schema({ _id: false })
export class ContactInfo {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    mobNo: string;
}

@Schema({ _id: false })
export class OnboardedBy {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    entityId: string;
}

export const ContactInfoSchema = SchemaFactory.createForClass(ContactInfo);
export const OnboardedBySchema = SchemaFactory.createForClass(OnboardedBy);


@Schema({ timestamps: true, strict: false })
export class Tenants {
    @Prop({ required: true, unique: true, default: uuidv4 })
    entityId: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    mobNo: string;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true })
    panCard: string;

    @Prop({ type: String, default: null })
    gstNumber: string | null;

    @Prop({ type: OnboardedBySchema, required: true })
    onboardedBy: OnboardedBy;

    @Prop({ type: ContactInfoSchema, required: true })
    contactInfo: ContactInfo;

    @Prop({ type: Number, default: 0 })
    employees: number;

    @Prop({ type: [String], default: [] })
    apps_id: string[];

    @Prop({ required: true, unique: true })
    tenantId: string;
}

export const TenantsSchema = SchemaFactory.createForClass(Tenants);


TenantsSchema.virtual('apps', {
    ref: 'Apps',
    localField: 'apps_id',
    foreignField: 'entityId',
});

TenantsSchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
        const r = ret as any
        delete r.apps_id;
        return r;
    },
});


TenantsSchema.set('toObject', { virtuals: true });