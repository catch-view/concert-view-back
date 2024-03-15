import { IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetPostsDto {
  @IsString()
  placeID: string;

  @IsNumber()
  @Type(() => Number)
  page: number;
}
