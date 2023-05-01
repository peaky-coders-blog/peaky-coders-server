import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const reactionsSeed = async () => {
  const reaction = [
    { name: 'Like', icon: 'like' },
    { name: 'Surprised', icon: 'surprised' },
    { name: 'Cry', icon: 'cry' },
    { name: 'Thoughtful', icon: 'thoughtful' },
    { name: 'Popcorn', icon: 'popcorn' },
  ]

  const isReactionsExist = await prisma.reaction.count()

  if (!isReactionsExist) {
    await prisma.reaction.createMany({ data: reaction })
  }
}
