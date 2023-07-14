import { Injectable } from '@nestjs/common'

import { PrismaService } from '@app/common/modules/prisma/prisma.service'

@Injectable()
export class ReactionsService {
  constructor(private prisma: PrismaService) {}

  async deleteAuthorReaction(articleReactionId: number, authorId: number) {
    const articleReaction = await this.prisma.articleReaction.findUnique({
      where: { id: articleReactionId },
    })
    await this.prisma.articleReaction.update({
      where: { id: articleReactionId },
      data: {
        authors: { disconnect: { id: authorId } },
        counter: --articleReaction.counter,
      },
    })
  }
}
