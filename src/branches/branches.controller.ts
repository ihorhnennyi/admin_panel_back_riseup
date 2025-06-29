import {
	BadRequestException,
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
import { TransformObjectIdPipe } from '../shared/pipes/transform-object-id.pipe'
import { BranchesService } from './branches.service'
import { CreateBranchDto } from './dto/create-branch.dto'
import { UpdateBranchDto } from './dto/update-branch.dto'

@ApiTags('Филиалы')
@ApiBearerAuth('bearerAuth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('branches')
export class BranchesController {
	constructor(private readonly branchesService: BranchesService) {}

	@ApiOperation({ summary: 'Получить все филиалы' })
	@ApiResponse({ status: 200, description: 'Список филиалов успешно получен' })
	@Get()
	findAll() {
		return this.branchesService.findAll()
	}

	@ApiOperation({ summary: 'Получить филиал по ID' })
	@ApiResponse({ status: 200, description: 'Филиал найден' })
	@ApiResponse({ status: 404, description: 'Филиал не найден' })
	@Get(':id')
	findOne(@Param('id', ParseObjectIdPipe) id: string) {
		return this.branchesService.findById(id)
	}

	@ApiOperation({ summary: 'Создать новый филиал' })
	@ApiResponse({ status: 201, description: 'Филиал успешно создан' })
	@ApiResponse({ status: 400, description: 'Некорректные данные' })
	@Roles('admin')
	@Post()
	create(
		@Body() dto: CreateBranchDto,
		@Body('city', TransformObjectIdPipe) city: any
	) {
		return this.branchesService.create({ ...dto, city })
	}

	@ApiOperation({ summary: 'Обновить филиал по ID' })
	@ApiResponse({ status: 200, description: 'Филиал обновлён' })
	@ApiResponse({ status: 404, description: 'Филиал не найден' })
	@ApiResponse({ status: 400, description: 'Некорректный ObjectId' })
	@Roles('admin')
	@Patch(':id')
	update(
		@Param('id', ParseObjectIdPipe) id: string,
		@Body() dto: UpdateBranchDto
	) {
		const updatedDto = { ...dto }

		if (dto.city) {
			const { Types } = require('mongoose')
			if (!Types.ObjectId.isValid(dto.city)) {
				throw new BadRequestException(`Invalid ObjectId: ${dto.city}`)
			}
			updatedDto.city = new Types.ObjectId(dto.city)
		}

		return this.branchesService.update(id, updatedDto)
	}

	@ApiOperation({ summary: 'Удалить филиал по ID' })
	@ApiResponse({ status: 200, description: 'Филиал успешно удалён' })
	@ApiResponse({ status: 404, description: 'Филиал не найден' })
	@Roles('admin')
	@Delete(':id')
	remove(@Param('id', ParseObjectIdPipe) id: string) {
		return this.branchesService.remove(id)
	}
}
