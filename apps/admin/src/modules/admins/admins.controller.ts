import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

import { AdminsService } from './admins.service'
import { CreateAdminDto, UpdateAdminDto, ChangePasswordDto } from './dtos'
import {
  T_CreateAdminResponse,
  T_GetAdminsResponse,
  T_GetAdminResponse,
  T_UpdateAdminResponse,
} from './models'

@ApiBearerAuth()
@ApiTags('Admins')
@UseGuards(AuthGuard('jwt'))
@Controller('admins')
export class AdminsController {
  constructor(private readonly service: AdminsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<T_GetAdminsResponse> {
    return this.service.getAll()
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id') id: string): Promise<T_GetAdminResponse> {
    return this.service.getOne(+id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createOne(@Body() dto: CreateAdminDto): Promise<T_CreateAdminResponse> {
    return this.service.createOne(dto)
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updateOne(
    @Param('id') adminId: number,
    @Body() dto: UpdateAdminDto,
  ): Promise<T_UpdateAdminResponse> {
    return this.service.updateOne(adminId, dto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteOne(@Param('id') adminId: number) {
    return this.service.deleteOne(adminId)
  }

  @Patch('changePassword/:id')
  @HttpCode(HttpStatus.OK)
  changePassword(@Param('id') adminId: number, @Body() dto: ChangePasswordDto) {
    return this.service.changePassword(dto, adminId)
  }
}
