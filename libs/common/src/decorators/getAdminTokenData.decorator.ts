import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { T_AdminTokenData } from '../models/shared/tokens'

export const GetAdminTokenData = createParamDecorator(
  (_, context: ExecutionContext): T_AdminTokenData => {
    const request = context.switchToHttp().getRequest()
    return {
      sub: request.user.sub,
      email: request.user.email,
    }
  },
)
