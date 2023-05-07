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

import { T_AdminId } from '@app/common/models/shared/admin'

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
    @Param('id') id: T_AdminId,
    @Body() dto: UpdateAdminDto,
  ): Promise<T_UpdateAdminResponse> {
    return this.service.updateOne(+id, dto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteOne(@Param('id') id: T_AdminId) {
    return this.service.deleteOne(+id)
  }

  @Patch('changePassword/:id')
  @HttpCode(HttpStatus.OK)
  changePassword(@Param('id') id: T_AdminId, @Body() dto: ChangePasswordDto) {
    return this.service.changePassword(dto, +id)
  }
}
