import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type ResourceDocument = Resource & Document;

@Schema({ collection: "resources", timestamps: true })
export class Resource {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: 0 })
  quantity: number;

  @Prop({ required: true, default: true })
  status: boolean;

  @Prop({ type: Types.ObjectId, ref: "Category", required: true })
  categoryId: Types.ObjectId;
}

export const ResourceSchema = SchemaFactory.createForClass(Resource);
