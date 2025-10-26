import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from '../../user/schemas';

@Schema({
  toObject: {
    versionKey: false,
  },
  toJSON: {
    versionKey: false,
  },
})
export class Usage {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  user_id: Types.ObjectId | User;

  @Prop()
  icon: string;

  @Prop()
  description: string;

  @Prop({
    type: String,
    required: true,
  })
  category: string;

  @Prop({
    type: Number,
    required: true
  })
  amount: number;

  @Prop({ default: false })
  removed: boolean;

  @Prop({ type: Date, default: Date.now })
  created: Date;

  @Prop({ type: Date, default: Date.now })
  updated: Date;
}

export const UsageSchema = SchemaFactory.createForClass(Usage);
