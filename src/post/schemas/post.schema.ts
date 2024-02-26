import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type PostDocument = mongoose.HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'postID' })
  postID: string;

  @Prop()
  placeID: string;

  @Prop()
  author: string;

  @Prop()
  password: string;

  @Prop()
  html: string;

  @Prop()
  createdAt: string;

  @Prop()
  updatedAt?: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
