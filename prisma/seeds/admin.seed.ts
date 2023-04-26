import { PrismaClient } from '@prisma/client'
import * as argon2 from 'argon2'

const prisma = new PrismaClient()

export const adminSeed = async () => {
  const hashedPassword = await argon2.hash('test1')

  await prisma.admin.upsert({
    where: { email: 'test@mail.com' },
    update: {},
    create: {
      email: 'test@mail.com',
      password: hashedPassword,
    },
  })
}
