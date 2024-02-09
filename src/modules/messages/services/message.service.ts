import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from '../schemas/message.schema';
import { CreateMessageDto, UpdateMessageDto } from '../dto/message.dto';
import { parseISO, isValid } from 'date-fns';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const currentDate = new Date();
    const createdMessage = new this.messageModel({
      ...createMessageDto,
      date: currentDate,
    });
    return await createdMessage.save();
  }

  async findAllByWorkspace(workspaceId: string): Promise<Message[]> {
    return await this.messageModel.find({ workspaceId }).exec();
  }

  async findOne(id: string): Promise<Message> {
    return await this.messageModel.findById(id).exec();
  }

  async update(
    id: string,
    updateMessageDto: UpdateMessageDto,
  ): Promise<Message> {
    return await this.messageModel
      .findByIdAndUpdate(id, updateMessageDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Message> {
    return await this.messageModel.findByIdAndDelete(id).exec();
  }

  async searchMessages(query: string): Promise<Message[]> {
    return await this.messageModel.find({ $text: { $search: query } }).exec();
  }

  async filterMessages(dateString: string, likes: number): Promise<Message[]> {
    const query = {};
    if (dateString) {
      const date = parseISO(dateString);
      if (isValid(date)) {
        query['date'] = {
          $gte: date,
          $lt: new Date(date.getTime() + 86400000),
        }; // Assuming you want messages for the whole day
      } else {
        throw new BadRequestException('Invalid date format');
      }
    }
    if (likes !== undefined && likes !== null) {
      query['likes'] = likes;
    }
    return await this.messageModel.find(query).exec();
  }
}
