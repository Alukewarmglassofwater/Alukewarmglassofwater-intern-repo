// src/auth/jwt-auth.guard.ts
import { AuthGuard } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    if (err || !user) {
      console.error('JWT verify error:', err || info);
      throw err || new UnauthorizedException(info?.message);
    }
    return user;
  }
}
