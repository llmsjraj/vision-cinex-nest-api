import { IsNotEmpty, IsUUID, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class WorkspaceParam {
  @ApiProperty({
    required: true,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID('4', { message: 'Invalid UUID format' })
  workspaceId: string;
}

export class IdParam {
  @ApiProperty({
    required: true,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID('4', { message: 'Invalid UUID format' })
  id: string;
}

export class SearchQuery {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @Matches(/^[^\s]+$/, {
    message: 'alias should not contain spaces',
  })
  query: string;
}
