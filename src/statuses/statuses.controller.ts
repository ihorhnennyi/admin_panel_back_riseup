import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
} from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { Roles } from '../common/decorators/roles.decorator'
import { RolesGuard } from '../common/guards/roles.guard'
import { ParseObjectIdPipe } from '../shared/pipes/parse-object-id.pipe'
import { CreateStatusDto } from './dto/create-status.dto'
import { UpdateStatusDto } from './dto/update-status.dto'
import { StatusesService } from './statuses.service'

@ApiTags('Статусы кандидатов')
@ApiBearerAuth('bearerAuth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('statuses')
export class StatusesController {
	constructor(private readonly service: StatusesService) {}

	@ApiOperation({ summary: 'Получить список всех статусов' })
	@ApiResponse({
		status: 200,
		description: 'Успешно получен список всех статусов кандидатов.',
	})
	@Get()
	findAll() {
		return this.service.findAll()
	}

	@ApiOperation({ summary: 'Получить статус по ID' })
	@ApiResponse({
		status: 200,
		description: 'Статус успешно найден.',
	})
	@ApiResponse({
		status: 404,
		description: 'Статус не найден.',
	})
	@Get(':id')
	findOne(@Param('id', ParseObjectIdPipe) id: string) {
		return this.service.findById(id)
	}

	@ApiOperation({ summary: 'Создать новый статус' })
	@ApiResponse({
		status: 201,
		description: 'Новый статус успешно создан.',
	})
	@ApiResponse({
		status: 403,
		description: 'Нет доступа (только для админа).',
	})
	@Roles('admin')
	@Post()
	create(@Body() dto: CreateStatusDto) {
		return this.service.create(dto)
	}

	@ApiOperation({ summary: 'Обновить статус по ID' })
	@ApiResponse({
		status: 200,
		description: 'Статус успешно обновлён.',
	})
	@ApiResponse({
		status: 404,
		description: 'Статус не найден.',
	})
	@ApiResponse({
		status: 403,
		description: 'Нет доступа (только для админа).',
	})
	@Roles('admin')
	@Patch(':id')
	update(
		@Param('id', ParseObjectIdPipe) id: string,
		@Body() dto: UpdateStatusDto
	) {
		return this.service.update(id, dto)
	}

	@ApiOperation({ summary: 'Удалить статус по ID' })
	@ApiResponse({
		status: 200,
		description: 'Статус успешно удалён.',
	})
	@ApiResponse({
		status: 404,
		description: 'Статус не найден.',
	})
	@ApiResponse({
		status: 403,
		description: 'Нет доступа (только для админа).',
	})
	@Roles('admin')
	@Delete(':id')
	remove(@Param('id', ParseObjectIdPipe) id: string) {
		return this.service.remove(id)
	}
}
