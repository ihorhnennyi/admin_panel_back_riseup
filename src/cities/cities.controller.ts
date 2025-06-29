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
import { CitiesService } from './cities.service'
import { CreateCityDto } from './dto/create-city.dto'
import { UpdateCityDto } from './dto/update-city.dto'

@ApiTags('Города')
@ApiBearerAuth('bearerAuth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('cities')
export class CitiesController {
	constructor(private readonly citiesService: CitiesService) {}

	@ApiOperation({ summary: 'Создание нового города' })
	@ApiResponse({ status: 201, description: 'Город успешно создан' })
	@ApiResponse({
		status: 409,
		description: 'Город с таким названием уже существует',
	})
	@Roles('admin')
	@Post()
	create(@Body() dto: CreateCityDto) {
		return this.citiesService.create(dto)
	}

	@ApiOperation({ summary: 'Получение списка всех городов' })
	@ApiResponse({ status: 200, description: 'Список городов' })
	@Get()
	findAll() {
		return this.citiesService.findAll()
	}

	@ApiOperation({ summary: 'Получение города по ID' })
	@ApiResponse({ status: 200, description: 'Город найден' })
	@ApiResponse({ status: 404, description: 'Город не найден' })
	@Get(':id')
	findOne(@Param('id', ParseObjectIdPipe) id: string) {
		return this.citiesService.findOne(id)
	}

	@ApiOperation({ summary: 'Обновление информации о городе' })
	@ApiResponse({ status: 200, description: 'Город успешно обновлён' })
	@ApiResponse({ status: 404, description: 'Город не найден' })
	@Roles('admin')
	@Patch(':id')
	update(
		@Param('id', ParseObjectIdPipe) id: string,
		@Body() dto: UpdateCityDto
	) {
		return this.citiesService.update(id, dto)
	}

	@ApiOperation({ summary: 'Удаление города' })
	@ApiResponse({ status: 200, description: 'Город успешно удалён' })
	@ApiResponse({ status: 404, description: 'Город не найден' })
	@Roles('admin')
	@Delete(':id')
	remove(@Param('id', ParseObjectIdPipe) id: string) {
		return this.citiesService.remove(id)
	}
}
