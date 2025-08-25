// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  // <-- named 'jwt'
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      issuer: process.env.JWT_ISSUER || 'http://localhost/',
      audience: process.env.JWT_AUDIENCE || 'api://default',
      algorithms: ['HS256'],
      secretOrKey: process.env.JWT_SECRET || 'dev-secret',
    });
    console.log('[JwtStrategy] initialized (HS256).'); // should print once at boot
  }

  async validate(payload: any) {
    return payload; // becomes req.user
  }
}
