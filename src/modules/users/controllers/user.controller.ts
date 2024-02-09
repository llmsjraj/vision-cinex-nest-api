import { Controller, Post, Body, Get, Request } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { SignupDto, SigninDto } from '../dto/user.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/modules/users/interfaces/user.interface';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @ApiResponse({ status: 201, description: 'User signed up successfully' })
  async signup(@Body() signupDto: SignupDto): Promise<any> {
    return this.userService.signup(signupDto);
  }

  @Post('signin')
  @ApiResponse({ status: 200, description: 'User signed in successfully' })
  async signin(@Body() signinDto: SigninDto): Promise<{ accessToken: string }> {
    return this.userService.signin(signinDto);
  }

  @Get('getUserWorkspaces')
  async getUserWorkspaces(@Request() req: { user: User }) {
    return await this.userService.getUserWorkspaces(req.user.userId);
  }
}
