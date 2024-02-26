import { IsBoolean, IsString } from 'class-validator';

export class SuccessResponse {
  @IsBoolean()
  result: boolean;

  @IsString()
  message?: string;
}
