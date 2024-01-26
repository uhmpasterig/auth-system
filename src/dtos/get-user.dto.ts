import { IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetUserDto {
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  id: number;
}
