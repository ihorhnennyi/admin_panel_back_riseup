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
import { CurrentUser } from '../common/decorators/current-user.decorator'
import { Roles } from '../common/decorators/roles.decorator'
import { RolesGuard } from '../common/guards/roles.guard'
import { ParseObjectIdPipe } from '../shared/pipes/parse-object-id.pipe'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './users.service'

@ApiTags('Пользователи')
@ApiBearerAuth('bearerAuth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@ApiOperation({ summary: 'Получить список всех пользователей' })
	@ApiResponse({
		status: 200,
		description: 'Список пользователей успешно получен.',
	})
	@Get()
	findAll() {
		return this.usersService.findAll()
	}

	@ApiOperation({ summary: 'Получить пользователя по ID' })
	@ApiResponse({
		status: 200,
		description: 'Пользователь найден.',
	})
	@ApiResponse({
		status: 404,
		description: 'Пользователь не найден.',
	})
	@Get(':id')
	findOne(@Param('id', ParseObjectIdPipe) id: string) {
		return this.usersService.findById(id)
	}

	@ApiOperation({ summary: 'Создать нового пользователя (только админ)' })
	@Roles('admin')
	@ApiResponse({
		status: 201,
		description: 'Пользователь успешно создан.',
	})
	@ApiResponse({
		status: 403,
		description: 'Доступ запрещён. Только админ может создавать пользователей.',
	})
	@Post()
	create(@Body() dto: CreateUserDto) {
		return this.usersService.create(dto)
	}

	@ApiOperation({ summary: 'Обновить данные пользователя (сам или админ)' })
	@ApiResponse({
		status: 200,
		description: 'Пользователь успешно обновлён.',
	})
	@ApiResponse({
		status: 403,
		description: 'Можно обновить только свой профиль или быть админом.',
	})
	@ApiResponse({
		status: 404,
		description: 'Пользователь не найден.',
	})
	@Patch(':id')
	update(
		@Param('id', ParseObjectIdPipe) id: string,
		@Body() dto: UpdateUserDto,
		@CurrentUser() user: any
	) {
		return this.usersService.update(id, dto, user)
	}

	@ApiOperation({ summary: 'Удалить пользователя по ID (только админ)' })
	@Roles('admin')
	@ApiResponse({
		status: 200,
		description: 'Пользователь успешно удалён.',
	})
	@ApiResponse({
		status: 404,
		description: 'Пользователь не найден.',
	})
	@Delete(':id')
	remove(@Param('id', ParseObjectIdPipe) id: string) {
		return this.usersService.remove(id)
	}
}
