import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isKeyValid', async: false })
export class IsKeyValid implements ValidatorConstraintInterface {
  validate(key: string) {
    const trimmedKey = key.trim();
    return trimmedKey.length > 0;
  }
  defaultMessage(): string {
    return 'key  cannot consist only of whitespace';
  }
}
@ValidatorConstraint({ name: 'isKeyValid', async: false })
export class IsTextValid implements ValidatorConstraintInterface {
  validate(text: string) {
    const trimmedText = text.trim();
    return trimmedText.length > 0;
  }
  defaultMessage(): string {
    return 'text  cannot consist only of whitespace';
  }
}
export class CreateDictionaryDto {
  @ApiProperty({
    description: 'the key of operation',
    example: '1k',
  })
  @IsString()
  @Validate(IsKeyValid)
  @IsNotEmpty()
  public key: String;
  @ApiProperty({
    description: 'the text',
    example: 'Hello',
  })
  @IsString()
  @IsNotEmpty()
  @Validate(IsTextValid)
  public text: String;
}