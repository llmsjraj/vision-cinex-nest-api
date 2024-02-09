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
import {
  ApiBearerAuth,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  FilterQuery,
  IdParam,
  SearchQuery,
  WorkspaceParam,
} from 'src/common/not-empty-param.dto';

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
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async create(@Body() createMessageDto: CreateMessageDto): Promise<Message> {
    return await this.messageService.create(createMessageDto);
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
  @ApiUnauthorizedResponse({ description: 'Unauthorized request' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get('search')
  async searchMessages(@Query() query: SearchQuery): Promise<Message[]> {
    return this.messageService.searchMessages(query.query);
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
  @ApiUnauthorizedResponse({ description: 'Unauthorized request' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get('filter')
  async filterMessages(@Query() query: FilterQuery): Promise<Message[]> {
    return this.messageService.filterMessages(query.date, query.likes);
  }

  @Get(':workspaceId')
  @ApiResponse({
    status: 200,
    description: 'List of all messages.',
    type: [Message],
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async findAll(@Param() params: WorkspaceParam): Promise<Message[]> {
    return await this.messageService.findAllByWorkspace(params.workspaceId);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The message with the specified ID.',
    type: Message,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request' })
  @ApiNotFoundResponse({ description: 'Message not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async findOne(@Param() params: IdParam): Promise<Message> {
    return await this.messageService.findOne(params.id);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'The message has been successfully updated.',
    type: Message,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request' })
  @ApiNotFoundResponse({ description: 'Message not found' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
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
  @ApiUnauthorizedResponse({ description: 'Unauthorized request' })
  @ApiNotFoundResponse({ description: 'Message not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async remove(@Param() params: IdParam): Promise<Message> {
    return await this.messageService.remove(params.id);
  }
}
