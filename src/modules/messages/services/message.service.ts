import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from '../schemas/message.schema';
import { CreateMessageDto, UpdateMessageDto } from '../dto/message.dto';
import {
  Workspace,
  WorkspaceDocument,
} from 'src/modules/workspaces/schemas/workspace.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
    @InjectModel(Workspace.name)
    private readonly workspaceModel: Model<WorkspaceDocument>,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    // Check if workspaceId exists
    const workspace = await this.workspaceModel.findById(
      createMessageDto.workspaceId,
    );
    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    // Create and save the message
    const currentDate = new Date();
    const createdMessage = new this.messageModel({
      ...createMessageDto,
      date: currentDate,
    });
    return await createdMessage.save();
  }

  async findAllByWorkspace(workspaceId: string): Promise<Message[]> {
    const messages = await this.messageModel.find({ workspaceId }).exec();
    if (!messages || messages.length === 0) {
      throw new NotFoundException('No messages found for this workspace');
    }
    return messages;
  }

  async findOne(id: string): Promise<Message> {
    const message = await this.messageModel.findById(id).exec();
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    return message;
  }

  async update(
    id: string,
    updateMessageDto: UpdateMessageDto,
  ): Promise<Message> {
    const message = await this.messageModel
      .findByIdAndUpdate(id, updateMessageDto, { new: true })
      .exec();
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    return message;
  }

  async remove(id: string): Promise<Message> {
    const message = await this.messageModel.findByIdAndDelete(id).exec();
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    return message;
  }

  async searchMessages(query: string): Promise<Message[]> {
    return await this.messageModel.find({ $text: { $search: query } }).exec();
  }

  async filterMessages(date: Date, likes: number): Promise<Message[]> {
    const query = {};

    if (date) {
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);

      query['date'] = {
        $gte: date,
        $lt: nextDay,
      };
    }

    if (likes !== undefined) {
      query['likes'] = likes;
    }

    return await this.messageModel.find(query).exec();
  }
}
