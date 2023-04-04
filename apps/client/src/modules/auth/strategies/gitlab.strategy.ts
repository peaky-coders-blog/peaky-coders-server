import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-gitlab2'

@Injectable()
export class GitlabStrategy extends PassportStrategy(Strategy, 'gitlab') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get('GITLAB_CLIENT_ID'),
      clientSecret: configService.get('GITLAB_CLIENT_SECRET'),
      scope: ['read_user'],
    })
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: any,
  ) {
    console.log('profile', profile)
    const { username, name, email } = profile._json
    const user = {
      username,
      name,
      email,
    }
    done(null, user)
  }
}
