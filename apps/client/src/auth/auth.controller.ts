import { Controller, Get, Redirect, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Controller('auth')
export class AuthController {
  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubLogin() {
    return 'ok'
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  @Redirect('http://127.0.0.1:5173/', 302)
  async githubLoginCallback(@Req() req: any) {
    console.log('req', req.github)
    return 'ok'
  }
}
