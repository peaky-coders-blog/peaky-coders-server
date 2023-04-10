import { PrismaClient } from '@prisma/client'

import { articlesSeed } from './articles.seed'
import { usersSeed } from './users.seed'

const prisma = new PrismaClient()

async function main() {
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
