import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({ description: 'The name of the user', example: 'Lalit Rajput' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The login of the user', example: 'lalit' })
  @IsNotEmpty()
  @IsString()
  readonly login: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

export class SigninDto {
  @ApiProperty({ description: 'The login of the user', example: 'lalit' })
  @IsNotEmpty()
  @IsString()
  readonly login: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
