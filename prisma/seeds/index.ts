import { PrismaClient } from '@prisma/client'

import { articlesSeed } from './articles.seed'
import { usersSeed } from './users.seed'
import { adminsSeed } from './admins.seed'
import { tagsSeed } from './tags.seed'
import { reactionsSeed } from './reactions.seed'

const prisma = new PrismaClient()

async function main() {
  await adminsSeed()

  await tagsSeed()
  await reactionsSeed()
  const superUser = await usersSeed()
  await articlesSeed(superUser)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
