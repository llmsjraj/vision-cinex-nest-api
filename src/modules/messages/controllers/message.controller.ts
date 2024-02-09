import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { MessageService } from '../services/message.service';
import { CreateMessageDto, UpdateMessageDto } from '../dto/message.dto';
import { Message } from '../schemas/message.schema';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('messages')
@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The message has been successfully created.',
    type: Message,
  })
  async create(@Body() createMessageDto: CreateMessageDto): Promise<Message> {
    return await this.messageService.create(createMessageDto);
  }

  @Get(':workspaceId')
  @ApiResponse({
    status: 200,
    description: 'List of all messages.',
    type: [Message],
  })
  async findAll(@Param('workspaceId') workspaceId: string): Promise<Message[]> {
    return await this.messageService.findAllByWorkspace(workspaceId);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The message with the specified ID.',
    type: Message,
  })
  async findOne(@Param('id') id: string): Promise<Message> {
    return await this.messageService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'The message has been successfully updated.',
    type: Message,
  })
  async update(
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ): Promise<Message> {
    return await this.messageService.update(id, updateMessageDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The message has been successfully deleted.',
    type: Message,
  })
  async remove(@Param('id') id: string): Promise<Message> {
    return await this.messageService.remove(id);
  }
}
