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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { CurrentUser } from '../common/decorators/current-user.decorator'
import { Roles } from '../common/decorators/roles.decorator'
import { RolesGuard } from '../common/guards/roles.guard'
import { ParseObjectIdPipe } from '../shared/pipes/parse-object-id.pipe'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './users.service'

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	findAll() {
		return this.usersService.findAll()
	}

	@Get(':id')
	findOne(@Param('id', ParseObjectIdPipe) id: string) {
		return this.usersService.findById(id)
	}

	@Roles('admin')
	@Post()
	create(@Body() dto: CreateUserDto) {
		return this.usersService.create(dto)
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() dto: UpdateUserDto,
		@CurrentUser() user: any
	) {
		return this.usersService.update(id, dto, user)
	}

	@Roles('admin')
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.usersService.remove(id)
	}
}
