import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWorkspaceDto {
  @IsNotEmpty()
  @IsString()
  readonly userId: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;
}

export class UpdateWorkspaceDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
