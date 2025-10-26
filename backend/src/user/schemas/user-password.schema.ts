import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<UserPassword>;

@Schema({
  toObject: {
    versionKey: false,
  },
  toJSON: {
    versionKey: false,
  },
})
export class UserPassword {
  @Prop({
    type: mongoose.Types.ObjectId,
    ref: 'User',
    unique: true,
    required: true,
  })
  user: mongoose.Types.ObjectId;

  @Prop()
  password: string;

  @Prop({ required: true })
  salt: string;

  @Prop()
  emailToken: string;

  @Prop()
  resetToken: string;

  @Prop({ default: false })
  emailVerified: boolean;

  @Prop({ default: 'email' })
  authType: string;

  @Prop({ type: [String], default: [] })
  loggedSessions: string[];

  @Prop({ default: false })
  removed: boolean;
}

export const UserPasswordSchema = SchemaFactory.createForClass(UserPassword);
