import { IsArray, IsString } from 'class-validator';

export class CreatePostDto {
  postImages: string[];

  @IsString()
  postHtml: string;

  createdAt: string;
  updatedAt: string;
}
