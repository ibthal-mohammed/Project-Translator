import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  public title: String;
  @IsNotEmpty()
  @IsString()
  targetLanguage: String;
}
