import { PrismaClient } from '@prisma/client'

import { articlesSeed } from './articles.seed'

const prisma = new PrismaClient()

async function main() {
  await articlesSeed()
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
