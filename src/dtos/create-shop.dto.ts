import { IsNotEmpty, IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateShopDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsUrl()
  @IsNotEmpty()
  image: string;
}
