import { IsArray, IsString, IsDate } from 'class-validator';
import { Types } from 'mongoose';

export class GetPostsResponse {
  @IsString()
  postID: Types.ObjectId;

  @IsString()
  placeID: string;

  @IsString()
  author: string;

  @IsArray()
  tags: [];

  @IsArray()
  images: string[];

  @IsString()
  title: string;

  @IsString()
  html: string;

  @IsDate()
  createdAt: string;
}
