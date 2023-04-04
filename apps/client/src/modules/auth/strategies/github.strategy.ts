import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-github2'
import { ConfigService } from '@nestjs/config'

import { T_GithubProfile } from '../models/github.model'

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get('GITHUB_CLIENT_ID'),
      clientSecret: configService.get('GITHUB_CLIENT_SECRET'),
      scope: 'user:email',
    })
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: T_GithubProfile,
  ) {
    const { username, emails, photos } = profile

    return { username, email: emails?.[0].value, photo: photos?.[0].value }
  }
}
