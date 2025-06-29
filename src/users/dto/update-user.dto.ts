// src/users/dto/update-user.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsEmail, IsIn, IsOptional, IsString, MinLength } from 'class-validator'
import { Role } from '../../shared/constants/roles.constant'

export class UpdateUserDto {
	@ApiPropertyOptional({ example: 'John Doe' })
	@IsOptional()
	@IsString()
	name?: string

	@ApiPropertyOptional({ example: 'john@example.com' })
	@IsOptional()
	@IsEmail()
	email?: string

	@ApiPropertyOptional({ example: 'newStrongPass123' })
	@IsOptional()
	@MinLength(6)
	password?: string

	@ApiPropertyOptional({ example: 'admin', enum: Object.values(Role) })
	@IsOptional()
	@IsIn(Object.values(Role))
	role?: string
}
