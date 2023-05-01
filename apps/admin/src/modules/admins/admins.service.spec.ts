import { Test, TestingModule } from '@nestjs/testing'
import { ConfigService } from '@nestjs/config'
import * as argon2 from 'argon2'

import { AdminsService } from './admins.service'

import { PrismaService } from '@app/common/modules/prisma/prisma.service'
import { CreateAdminDto } from './dtos'

describe('AdminsService', () => {
  let adminsService: AdminsService
  let mockAdminsPrisma: PrismaService
  const removableAdminIds = []

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminsService, PrismaService, ConfigService],
    }).compile()

    adminsService = module.get<AdminsService>(AdminsService)
    mockAdminsPrisma = module.get<PrismaService>(PrismaService)
  })

  afterAll(() => {
    removableAdminIds.map(async (id) => {
      await mockAdminsPrisma.admin.delete({ where: { id } })
    })
  })

  it('should be defined', () => {
    expect(adminsService).toBeDefined()
  })

  it('should return admins', async () => {
    const mockAdminsData = [
      { id: 1, name: 'Cucold' },
      { id: 2, name: 'Baty' },
    ]
    mockAdminsPrisma.admin.findMany = jest
      .fn()
      .mockReturnValueOnce(mockAdminsData)

    expect(await adminsService.getAll()).toStrictEqual({ data: mockAdminsData })
  })

  it('should create a admin', async () => {
    const dto: CreateAdminDto = { email: 'admin@mail.com', password: 'test2' }
    const admin = await adminsService.createOne(dto)
    if (admin.data.id) {
      removableAdminIds.push(admin.data.id)
    }

    const isPasswordVerify = await argon2.verify(
      admin.data.password,
      dto.password,
    )

    expect(isPasswordVerify).toBeTruthy()
    expect(admin.data).toEqual({
      id: expect.any(Number),
      email: dto.email,
      password: expect.any(String),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })
})
