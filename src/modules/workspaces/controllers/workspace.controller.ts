import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Request,
} from '@nestjs/common';
import { WorkspaceService } from '../services/workspace.service';
import { CreateWorkspaceDto, UpdateWorkspaceDto } from '../dto/workspace.dto';
import { Workspace } from '../schemas/workspace.schema';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { User } from 'src/modules/users/interfaces/user.interface';

@ApiTags('workspaces')
@Controller('workspaces')
@ApiBearerAuth()
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The workspace has been successfully created.',
    type: Workspace,
  })
  async create(
    @Body() createWorkspaceDto: CreateWorkspaceDto,
  ): Promise<Workspace> {
    return await this.workspaceService.create(createWorkspaceDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of all workspaces.',
    type: [Workspace],
  })
  async findAll(@Request() req: { user: User }): Promise<Workspace[]> {
    return await this.workspaceService.findAllByUser(req.user.userId);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The workspace with the specified ID.',
    type: Workspace,
  })
  async findOne(@Param('id') id: string): Promise<Workspace> {
    return await this.workspaceService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'The workspace has been successfully updated.',
    type: Workspace,
  })
  async update(
    @Param('id') id: string,
    @Body() updateWorkspaceDto: UpdateWorkspaceDto,
  ): Promise<Workspace> {
    return await this.workspaceService.update(id, updateWorkspaceDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The workspace has been successfully deleted.',
    type: Workspace,
  })
  async remove(@Param('id') id: string): Promise<Workspace> {
    return await this.workspaceService.remove(id);
  }
}
