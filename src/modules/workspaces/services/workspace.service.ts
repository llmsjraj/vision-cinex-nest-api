import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Workspace, WorkspaceDocument } from '../schemas/workspace.schema';
import { CreateWorkspaceDto, UpdateWorkspaceDto } from '../dto/workspace.dto';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectModel(Workspace.name)
    private workspaceModel: Model<WorkspaceDocument>,
  ) {}

  async create(createWorkspaceDto: CreateWorkspaceDto): Promise<Workspace> {
    const createdWorkspace = new this.workspaceModel(createWorkspaceDto);
    return await createdWorkspace.save();
  }

  async findAll(): Promise<Workspace[]> {
    return await this.workspaceModel.find().exec();
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
