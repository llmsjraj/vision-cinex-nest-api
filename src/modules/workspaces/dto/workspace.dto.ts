import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWorkspaceDto {
  @ApiProperty({
    description: 'The user ID for the workspace.',
    example: 'user123',
  })
  @IsNotEmpty()
  @IsString()
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
