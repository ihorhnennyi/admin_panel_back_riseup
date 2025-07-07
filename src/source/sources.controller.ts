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
import { CreateSourceDto } from './dto/create-source.dto'
import { UpdateSourceDto } from './dto/update-source.dto'
import { SourcesService } from './sources.service'

@ApiTags('Источники')
@ApiBearerAuth('bearerAuth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('sources')
export class SourcesController {
	constructor(private readonly service: SourcesService) {}

	@ApiOperation({ summary: 'Получить список всех источников' })
	@ApiResponse({
		status: 200,
		description: 'Список источников успешно получен.',
	})
	@Get()
	findAll() {
		return this.service.findAll()
	}

	@ApiOperation({ summary: 'Получить источник по ID' })
	@ApiResponse({ status: 200, description: 'Источник найден.' })
	@ApiResponse({ status: 404, description: 'Источник не найден.' })
	@Get(':id')
	findOne(@Param('id', ParseObjectIdPipe) id: string) {
		return this.service.findById(id)
	}

	@ApiOperation({ summary: 'Создать новый источник' })
	@ApiResponse({ status: 201, description: 'Источник успешно создан.' })
	@ApiResponse({ status: 403, description: 'Нет доступа (только для админа).' })
	@Roles('admin')
	@Post()
	create(@Body() dto: CreateSourceDto) {
		return this.service.create(dto)
	}

	@ApiOperation({ summary: 'Обновить источник по ID' })
	@ApiResponse({ status: 200, description: 'Источник обновлён.' })
	@ApiResponse({ status: 404, description: 'Источник не найден.' })
	@ApiResponse({ status: 403, description: 'Нет доступа (только для админа).' })
	@Roles('admin')
	@Patch(':id')
	update(
		@Param('id', ParseObjectIdPipe) id: string,
		@Body() dto: UpdateSourceDto
	) {
		return this.service.update(id, dto)
	}

	@ApiOperation({ summary: 'Удалить источник по ID' })
	@ApiResponse({ status: 200, description: 'Источник удалён.' })
	@ApiResponse({ status: 404, description: 'Источник не найден.' })
	@ApiResponse({ status: 403, description: 'Нет доступа (только для админа).' })
	@Roles('admin')
	@Delete(':id')
	remove(@Param('id', ParseObjectIdPipe) id: string) {
		return this.service.remove(id)
	}
}
