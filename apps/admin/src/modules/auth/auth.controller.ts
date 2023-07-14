import { AuthGuard } from '@nestjs/passport'
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { AuthService } from './auth.service'
import { SignInDto } from './dtos'
import { T_AuthResponse, T_RefreshResponse } from './models'

import { GetUserId } from '@app/common/decorators/getUserId.decorator'
import { JwtRefreshGuard } from '@app/common/guards/jwtRefresh.guard'
import { T_TokenData } from 'apps/admin/src/modules/auth/models/token.model'
import { TokensService } from '@app/common/modules/tokens/tokens.service'
import { GetAdminTokenData } from '@app/common/decorators/getAdminTokenData.decorator'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private tokensService: TokensService,
  ) {}

  // Аутентификация
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signInLocal(@Body() dto: SignInDto): Promise<T_AuthResponse> {
    return this.service.signIn(dto)
  }

  // Первоначальная проверка авторизации
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('check')
  @HttpCode(HttpStatus.OK)
  checkAuth(@GetUserId() adminId: number): Promise<T_AuthResponse> {
    return this.service.check(adminId)
  }

  // Обновление пары токенов
  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(
    @GetAdminTokenData() token: T_TokenData,
  ): Promise<T_RefreshResponse> {
    const { sub, ...rest } = token
    // Получаем юзера и формируем новый токен
    const tokens = await this.tokensService.generateAdminTokens({
      ...rest,
      userId: sub,
    })
    return {
      data: tokens,
    }
  }
}
