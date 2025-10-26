import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum UserRole {
  User = 'user',
  Admin = 'admin',
}

@Schema({
  toObject: {
    versionKey: false,
  },
  toJSON: {
    versionKey: false,
  },
})
export class User {
  @Prop({ required: true })
  fullName: string;

  @Prop({
    trim: true,
    type: String,
    default: null,
  })
  profileImageUrl: string;

  @Prop({
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    unique: true,
  })
  email: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.User })
  user_role: string;

  @Prop({ default: false })
  removed: boolean;

  @Prop({ default: false })
  enabled: boolean;

  @Prop({ type: Date, default: Date.now })
  created: Date;

  @Prop({ type: Date, default: Date.now })
  updated: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
