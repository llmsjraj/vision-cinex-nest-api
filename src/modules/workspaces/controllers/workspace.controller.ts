import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { WorkspaceService } from '../services/workspace.service';
import { CreateWorkspaceDto, UpdateWorkspaceDto } from '../dto/workspace.dto';
import { Workspace } from '../schemas/workspace.schema';

@Controller('workspaces')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  async create(
    @Body() createWorkspaceDto: CreateWorkspaceDto,
  ): Promise<Workspace> {
    return await this.workspaceService.create(createWorkspaceDto);
  }

  @Get()
  async findAll(): Promise<Workspace[]> {
    return await this.workspaceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Workspace> {
    return await this.workspaceService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWorkspaceDto: UpdateWorkspaceDto,
  ): Promise<Workspace> {
    return await this.workspaceService.update(id, updateWorkspaceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Workspace> {
    return await this.workspaceService.remove(id);
  }
}
