import { Controller, Post, Body, Get, Request } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { SignupDto, SigninDto } from '../dto/user.dto';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/modules/users/interfaces/user.interface';
import { Workspace } from '../../workspaces/interfaces/workspace.interface';
@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @ApiResponse({ status: 201, description: 'User signed up successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async signup(@Body() signupDto: SignupDto): Promise<any> {
    return this.userService.signup(signupDto);
  }

  @Post('signin')
  @ApiResponse({ status: 200, description: 'User signed in successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async signin(@Body() signinDto: SigninDto): Promise<{ accessToken: string }> {
    return this.userService.signin(signinDto);
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized request' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get('getUserWorkspaces')
  async getUserWorkspaces(
    @Request() req: { user: User },
  ): Promise<Workspace[]> {
    return await this.userService.getUserWorkspaces(req.user.userId);
  }
}
