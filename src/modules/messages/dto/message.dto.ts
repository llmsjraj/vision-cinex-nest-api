import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({
    description: 'The ID of the workspace for the message.',
    example: 'workspace123',
  })
  @IsNotEmpty()
  @IsString()
  readonly workspaceId: string;

  @ApiProperty({
    description: 'The content of the message.',
    example: 'Hello World!',
  })
  @IsNotEmpty()
  @IsString()
  readonly content: string;
}

export class UpdateMessageDto {
  @ApiProperty({
    description: 'The new content of the message.',
    example: 'New content!',
  })
  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @ApiProperty({
    description: 'The new number of likes for the message.',
    example: 10,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  readonly likes: number;
}
