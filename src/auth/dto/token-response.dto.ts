import { ApiProperty } from '@nestjs/swagger'

export class TokenUserDto {
	@ApiProperty()
	_id: string

	@ApiProperty()
	email: string

	@ApiProperty()
	name: string

	@ApiProperty({ enum: ['admin', 'recruiter'] })
	role: string
}

export class TokenResponseDto {
	@ApiProperty()
	accessToken: string

	@ApiProperty()
	refreshToken: string

	@ApiProperty({ type: TokenUserDto })
	user: TokenUserDto
}
