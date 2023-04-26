import {
  Controller,
  Get,
  Post,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { E_UserFrom } from '@prisma/client'
import { Response } from 'express'

import { AuthService } from './auth.service'
import { T_GithubCallback } from './models/github.model'

import { TokensService } from '@app/common/modules/tokens/tokens.service'
import { JwtRefreshGuard } from '@app/common/guards/jwtRefresh.guard'
import { GetAuthTokenData } from '@app/common/decorators/getAuthTokenData.decorator'
import { T_ClientTokenData } from '@app/common/models/shared/tokens'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokensService: TokensService,
  ) {}

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
    const tokens = await this.authService.authByThirdParty(
      req.user,
      E_UserFrom.GITHUB,
    )

    res.cookie('accessToken', tokens.accessToken)
    res.cookie('refreshToken', tokens.refreshToken)

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
  async gitlabLoginCallback(
    @Req() req: T_GithubCallback,
    @Res() res: Response,
  ) {
    const tokens = await this.authService.authByThirdParty(
      req.user,
      E_UserFrom.GITLAB,
    )

    res.cookie('accessToken', tokens.accessToken)
    res.cookie('refreshToken', tokens.refreshToken)

    return 'ok'
  }

  // Обновление токенов
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  refreshTokens(@GetAuthTokenData() token: T_ClientTokenData) {
    const { sub, ...rest } = token
    return this.tokensService.generateClientTokens({ ...rest, userId: sub })
  }
}
