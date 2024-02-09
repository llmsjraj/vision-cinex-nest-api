import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateAccessToken(userId: string) {
    return this.jwtService.sign({ userId });
  }

  async generateRefreshToken(userId: string) {
    // Implement refresh token generation if needed
    console.log(userId);
  }

  async verifyToken(token: string) {
    return this.jwtService.verify(token);
  }
}
