import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../schemas/user.schema';
import { SignupDto } from '../dto/user.dto';
import { SigninDto } from '../dto/user.dto';
import { AuthService } from './auth.service';
import {
  Workspace,
  WorkspaceDocument,
} from '../../workspaces/schemas/workspace.schema';

import { Workspace as WorkspaceInt } from '../../workspaces/interfaces/workspace.interface';
import { UserWithoutPassword } from '../interfaces/user.interface';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Workspace.name)
    private workspaceModel: Model<WorkspaceDocument>,
    private readonly authService: AuthService,
  ) {}

  async signup(signupDto: SignupDto): Promise<UserWithoutPassword> {
    // Check if a user with the provided login already exists
    const existingUser = await this.userModel
      .findOne({ login: signupDto.login })
      .exec();
    if (existingUser) {
      throw new ConflictException('User with this login already exists');
    }

    const hashedPassword = await bcrypt.hash(signupDto.password, 10);
    const newUser = new this.userModel({
      name: signupDto.name,
      login: signupDto.login,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // Directly return the relevant fields without including password
    return {
      name: savedUser.name,
      login: savedUser.login,
      _id: savedUser._id,
    };
  }

  async signin(signinDto: SigninDto): Promise<{ accessToken: string }> {
    const user = await this.userModel
      .findOne({ login: signinDto.login })
      .exec();
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isValidPassword = await bcrypt.compare(
      signinDto.password,
      user.password,
    );
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const accessToken = await this.authService.generateAccessToken(user._id);
    return { accessToken };
  }

  async exists(userId: string): Promise<boolean> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return true;
  }

  async getUserWorkspaces(userId: string): Promise<WorkspaceInt[]> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.workspaceModel
      .aggregate([
        {
          $match: { userId }, // Match workspaces belonging to the user
        },
        {
          $lookup: {
            from: 'messages',
            let: { workspaceId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ['$workspaceId', '$$workspaceId'] }, // Match messages for each workspace
                },
              },
            ],
            as: 'messages', // Include messages associated with each workspace
          },
        },
      ])
      .exec();
  }
}
