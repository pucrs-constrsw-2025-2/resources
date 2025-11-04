import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ValueType } from '../enums/value-type.enum';

export type FeatureDocument = Feature & Document;

@Schema({ collection: 'features', timestamps: true })
export class Feature {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: ValueType, default: ValueType.STRING })
  type: ValueType;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  categoryId: Types.ObjectId;
}

export const FeatureSchema = SchemaFactory.createForClass(Feature);
