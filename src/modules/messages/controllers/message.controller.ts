import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { MessageService } from '../services/message.service';
import { CreateMessageDto, UpdateMessageDto } from '../dto/message.dto';
import { Message } from '../schemas/message.schema';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IdParam, WorkspaceParam } from 'src/common/not-empty-param.dto';

@ApiTags('messages')
@Controller('messages')
@ApiBearerAuth()
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
  async findAll(@Param() params: WorkspaceParam): Promise<Message[]> {
    return await this.messageService.findAllByWorkspace(params.workspaceId);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The message with the specified ID.',
    type: Message,
  })
  async findOne(@Param() params: IdParam): Promise<Message> {
    return await this.messageService.findOne(params.id);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'The message has been successfully updated.',
    type: Message,
  })
  async update(
    @Param() params: IdParam,
    @Body() updateMessageDto: UpdateMessageDto,
  ): Promise<Message> {
    return await this.messageService.update(params.id, updateMessageDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The message has been successfully deleted.',
    type: Message,
  })
  async remove(@Param() params: IdParam): Promise<Message> {
    return await this.messageService.remove(params.id);
  }

  @ApiQuery({
    name: 'query',
    description: 'Search query string',
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Search results returned successfully',
    type: [Message],
  })
  @Get('search')
  async searchMessages(@Query('query') query: string): Promise<Message[]> {
    return this.messageService.searchMessages(query);
  }

  @ApiQuery({
    name: 'date',
    description: 'Filter messages by date',
    required: false,
  })
  @ApiQuery({
    name: 'likes',
    description: 'Filter messages by number of likes',
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Filtered messages returned successfully',
    type: [Message],
  })
  @Get('filter')
  async filterMessages(
    @Query('date') date: string,
    @Query('likes') likes: number,
  ): Promise<Message[]> {
    return this.messageService.filterMessages(date, likes);
  }
}
