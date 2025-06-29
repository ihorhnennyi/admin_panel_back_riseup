import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator'
import { Role } from '../../shared/constants/roles.constant'

export class CreateUserDto {
	@ApiProperty({ example: 'john@example.com' })
	@IsEmail()
	email: string

	@ApiProperty({ example: 'John Doe' })
	@IsNotEmpty()
	name: string

	@ApiProperty({ example: 'strongpassword123' })
	@MinLength(6)
	password: string

	@ApiProperty({ enum: Role, default: Role.RECRUITER })
	@IsEnum(Role)
	role: Role
}
