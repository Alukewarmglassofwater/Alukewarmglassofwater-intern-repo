// src/demo.controller.ts
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller()
export class DemoController {
  @Get('public')
  getPublic() {
    return { ok: true, route: 'public' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getProtected(@Req() req: any) {
    return { ok: true, route: 'protected', user: req.user?.sub };
  }
}
