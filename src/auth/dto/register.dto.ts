import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class RegisterDto {
	@ApiProperty({ example: 'john@example.com' })
	@IsEmail()
	email: string

	@ApiProperty({ example: 'John Doe' })
	@IsNotEmpty()
	name: string

	@ApiProperty({ example: 'strongpassword123' })
	@MinLength(6)
	password: string
}
