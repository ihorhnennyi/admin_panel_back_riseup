import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { CurrentUser } from '../common/decorators/current-user.decorator'
import { RolesGuard } from '../common/guards/roles.guard'
import { ParseObjectIdPipe } from '../shared/pipes/parse-object-id.pipe'
import { CandidatesService } from './candidates.service'
import { CreateCandidateDto } from './dto/create-candidate.dto'
import { UpdateCandidateDto } from './dto/update-candidate.dto'

@ApiTags('Кандидаты')
@ApiBearerAuth('bearerAuth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('candidates')
export class CandidatesController {
	constructor(private readonly candidatesService: CandidatesService) {}

	@ApiOperation({ summary: 'Получить всех кандидатов или только своих' })
	@ApiQuery({ name: 'own', required: false, type: Boolean })
	@ApiQuery({ name: 'page', required: false })
	@ApiQuery({ name: 'limit', required: false })
	@ApiQuery({ name: 'city', required: false })
	@ApiQuery({ name: 'status', required: false })
	@ApiQuery({ name: 'source', required: false })
	@ApiQuery({ name: 'gender', required: false })
	@ApiQuery({ name: 'isActive', required: false })
	@ApiQuery({ name: 'search', required: false })
	@ApiQuery({ name: 'recruiter', required: false })
	@ApiQuery({ name: 'startDate', required: false })
	@ApiQuery({ name: 'endDate', required: false })
	@Get()
	findAll(@CurrentUser() user: any, @Query() query: any) {
		const own = query.own === 'true'
		return this.candidatesService.findAll(user, own, query)
	}

	@ApiOperation({ summary: 'Получить кандидата по ID' })
	@Get(':id')
	findOne(
		@Param('id', ParseObjectIdPipe) id: string,
		@CurrentUser() user: any
	) {
		return this.candidatesService.findById(id, user)
	}

	@ApiOperation({ summary: 'Создать кандидата' })
	@Post()
	create(@Body() dto: CreateCandidateDto, @CurrentUser() user: any) {
		return this.candidatesService.create(dto, user)
	}

	@ApiOperation({ summary: 'Обновить кандидата по ID' })
	@Patch(':id')
	update(
		@Param('id', ParseObjectIdPipe) id: string,
		@Body() dto: UpdateCandidateDto,
		@CurrentUser() user: any
	) {
		return this.candidatesService.update(id, dto, user)
	}

	@ApiOperation({ summary: 'Удалить кандидата по ID' })
	@Delete(':id')
	remove(@Param('id', ParseObjectIdPipe) id: string, @CurrentUser() user: any) {
		return this.candidatesService.remove(id, user)
	}
}
