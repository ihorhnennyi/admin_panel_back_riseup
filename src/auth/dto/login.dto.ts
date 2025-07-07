import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MinLength } from 'class-validator'

export class LoginDto {
	@ApiProperty({ example: 'ihor@gmail.com' })
	@IsEmail()
	email: string

	@ApiProperty({ example: 'qwerty1' })
	@MinLength(6)
	@IsString()
	password: string
}
