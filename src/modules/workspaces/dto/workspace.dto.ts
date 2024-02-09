import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateWorkspaceDto {
  @ApiProperty({
    description: 'The user ID for the workspace.',
    example: '65c62fca677dcad184eda1bf',
  })
  @IsNotEmpty()
  @IsString()
  @IsMongoId({ message: 'Invalid userId' })
  readonly userId: string;

  @ApiProperty({
    description: 'The name of the workspace.',
    example: 'Project X',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}

export class UpdateWorkspaceDto {
  @ApiProperty({
    description: 'The new name of the workspace.',
    example: 'Project Y',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
