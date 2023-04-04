import { Controller, Get, Redirect, Req, Res, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UserFrom } from '@prisma/client'
import { Response } from 'express'

import { AuthService } from './auth.service'
import { T_GithubCallback } from './models/github.model'

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubLogin() {
    return 'ok'
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  @Redirect('http://127.0.0.1:5173/', 302)
  async githubLoginCallback(
    @Req() req: T_GithubCallback,
    @Res() res: Response,
  ) {
    const tokens = await this.service.authByThirdParty(
      req.user,
      UserFrom.GITHUB,
    )

    res.cookie('accessToken', tokens.accessToken)
    res.cookie('refreshToken', tokens.refreshToken)
    res.cookie('from', UserFrom.GITHUB)

    return 'ok'
  }

  @Get('gitlab')
  @UseGuards(AuthGuard('gitlab'))
  async gitlabLogin() {
    return 'ok'
  }

  @Get('gitlab/callback')
  @UseGuards(AuthGuard('gitlab'))
  @Redirect('http://127.0.0.1:5173/', 302)
  async gitlabLoginCallback(@Req() req) {
    return req.user
  }
}
