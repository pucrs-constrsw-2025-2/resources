import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type FeatureValueDocument = FeatureValue & Document;

@Schema({ collection: "feature_values", timestamps: true })
export class FeatureValue {
  @Prop({ required: false })
  valueString: string;

  @Prop({ required: false })
  valueNumber: number;

  @Prop({ required: false })
  valueBoolean: boolean;

  @Prop({ type: Types.ObjectId, ref: "Resource", required: true })
  resourceId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "Feature", required: true })
  featureId: Types.ObjectId;
}

export const FeatureValueSchema = SchemaFactory.createForClass(FeatureValue);
