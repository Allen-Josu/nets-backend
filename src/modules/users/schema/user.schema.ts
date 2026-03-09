import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role } from "src/modules/roles/schema/role.schema";

export type UserDocument = User & Document;

export interface UserWithRole extends User {
  role?: Role | null;
}

@Schema({ timestamps: true, strict: false })
export class User {
  @Prop({ required: true })
  entityId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  entity: string;

  @Prop({ type: String, default: null })
  role_id: string | null; 
}

export const UserSchema = SchemaFactory.createForClass(User);

// Virtual to populate role
UserSchema.virtual('role', {
  ref: Role.name,
  localField: 'role_id',
  foreignField: 'entityId',
  justOne: true,
});


UserSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    const r = ret as any;
    delete r._id;
    delete r.__v;
    delete r.role_id;

    if (!r.role) r.role = null;
    return r;
  },
});

UserSchema.set('toObject', {
  virtuals: true,
  transform: (_doc, ret) => {
    const r = ret as any;
    delete r._id;
    delete r.__v;
    delete r.role_id;

    if (!r.role) r.role = null;
    return r;
  },
});