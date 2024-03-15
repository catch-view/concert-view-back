import {
  IsArray,
  IsString,
  IsDate,
  Length,
  Matches,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  placeID: string;

  @IsString()
  @Matches(/^[가-힣|]+$/)
  @MinLength(2)
  @MaxLength(8)
  author: string;

  @IsString()
  @Length(4)
  password: string;

  @IsArray()
  tags: [];

  @IsArray()
  images: string[];

  @IsString()
  @MinLength(2)
  @MaxLength(40)
  title: string;

  @IsString()
  html: string;

  @IsString()
  createdAt: string;
}
