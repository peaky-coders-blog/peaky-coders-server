import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-gitlab2'
import { T_GitlabProfile } from '../models/gitlab.model'

@Injectable()
export class GitlabStrategy extends PassportStrategy(Strategy, 'gitlab') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get('GITLAB_CLIENT_ID'),
      clientSecret: configService.get('GITLAB_CLIENT_SECRET'),
      scope: ['read_user'],
      callbackURL: 'http://127.0.0.1:5173/api/auth/gitlab/callback',
    })
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: T_GitlabProfile,
    done: any,
  ) {
    const { username, email, avatar_url } = profile._json
    const user = {
      username,
      photo: avatar_url,
      email,
    }
    done(null, user)
  }
}
