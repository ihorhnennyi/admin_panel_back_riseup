import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MinLength } from 'class-validator'

export class LoginDto {
	@ApiProperty({ example: 'john@example.com' })
	@IsEmail()
	email: string

	@ApiProperty({ example: 'strongpassword123' })
	@MinLength(6)
	@IsString()
	password: string
}
