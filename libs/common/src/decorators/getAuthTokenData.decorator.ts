import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { T_ClientTokenData } from '@app/common/models/shared/tokens'

export const GetAuthTokenData = createParamDecorator(
  (_, context: ExecutionContext): T_ClientTokenData => {
    const request = context.switchToHttp().getRequest()
    return {
      sub: request.user.sub,
      email: request.user.email,
      avatar: request.user.avatar,
      username: request.user.username,
    }
  },
)
