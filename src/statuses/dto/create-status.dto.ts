import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateStatusDto {
	@ApiProperty({ example: 'На рассмотрении', description: 'Название статуса' })
	@IsNotEmpty()
	@IsString()
	name: string

	@ApiProperty({
		example: '#FFD700',
		description: 'Цвет статуса в HEX-формате',
	})
	@IsNotEmpty()
	@IsString()
	color: string

	@ApiPropertyOptional({
		example: 'Кандидат находится на стадии рассмотрения резюме',
		description: 'Описание статуса',
	})
	@IsOptional()
	@IsString()
	description?: string
}
