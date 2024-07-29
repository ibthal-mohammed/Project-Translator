import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegAuthDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  public fullName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  public password: string;
}
  