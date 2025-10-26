import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../../user/schemas';

export type IncomeDocument = HydratedDocument<Income>;

@Schema({
  toObject: {
    versionKey: false,
  },
  toJSON: {
    versionKey: false,
  },
})
export class Income {
  @Prop()
  icon: string;

  @Prop()
  description: string;

  @Prop()
  amount: number;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  user_id: Types.ObjectId | User;

  @Prop({
    type: String,
    required: true,
  })
  source: string;

  @Prop({ default: false })
  removed: boolean;

  @Prop({
    type: Date,
    default: Date.now,
  })
  created: Date;

  @Prop({
    type: Date,
    default: Date.now,
  })
  updated: Date;
}

export const IncomeSchema = SchemaFactory.createForClass(Income);
