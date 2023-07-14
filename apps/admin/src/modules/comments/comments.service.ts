import { Injectable } from '@nestjs/common'

import { PrismaService } from '@app/common/modules/prisma/prisma.service'

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async deleteOne(commentId: number) {
    await this.prisma.articleComment.delete({ where: { id: commentId } })
  }
}
