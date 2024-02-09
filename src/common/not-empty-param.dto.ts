import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class WorkspaceParam {
  @ApiProperty({
    required: true,
    example: '65c62fca677dcad184eda1bf',
  })
  @IsNotEmpty()
  @IsString()
  @IsMongoId({ message: 'Invalid ID' })
  workspaceId: string;
}

export class IdParam {
  @ApiProperty({
    required: true,
    example: '65c62fca677dcad184eda1bf',
  })
  @IsNotEmpty()
  @IsString()
  @IsMongoId({ message: 'Invalid ID' })
  id: string;
}

export class SearchQuery {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @Matches(/^[^\s]+$/, {
    message: 'query should not contain spaces',
  })
  query: string;
}

export class FilterQuery {
  @ApiProperty({
    required: true,
    example: '2024-02-09',
  })
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  likes: number;
}
