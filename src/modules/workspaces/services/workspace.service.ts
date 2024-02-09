import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Workspace, WorkspaceDocument } from '../schemas/workspace.schema';
import { CreateWorkspaceDto, UpdateWorkspaceDto } from '../dto/workspace.dto';
import { UserService } from '../../users/services/user.service';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectModel(Workspace.name)
    private workspaceModel: Model<WorkspaceDocument>,
    private readonly userService: UserService,
  ) {}

  async create(createWorkspaceDto: CreateWorkspaceDto): Promise<Workspace> {
    // Check if the userId exists
    const userExists = await this.userService.exists(createWorkspaceDto.userId);
    if (!userExists) {
      throw new NotFoundException(
        `User with ID ${createWorkspaceDto.userId} not found`,
      );
    }

    // If userId exists, proceed with creating the workspace
    const createdWorkspace = new this.workspaceModel(createWorkspaceDto);
    return await createdWorkspace.save();
  }

  async findAllByUser(userId: string): Promise<Workspace[]> {
    // Fetch workspaces based on the userId
    return await this.workspaceModel.find({ userId }).exec();
  }

  async findOne(id: string): Promise<Workspace> {
    return await this.workspaceModel.findById(id).exec();
  }

  async update(
    id: string,
    updateWorkspaceDto: UpdateWorkspaceDto,
  ): Promise<Workspace> {
    return await this.workspaceModel
      .findByIdAndUpdate(id, updateWorkspaceDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Workspace> {
    return await this.workspaceModel.findByIdAndDelete(id).exec();
  }
}
