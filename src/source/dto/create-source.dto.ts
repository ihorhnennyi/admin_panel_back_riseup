import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateSourceDto {
	@ApiProperty({ example: 'Telegram', description: 'Название источника' })
	@IsNotEmpty()
	@IsString()
	name: string

	@ApiProperty({ example: '#FF5722', description: 'Цвет источника' })
	@IsNotEmpty()
	@IsString()
	color: string

	@ApiPropertyOptional({
		example: 'Пришёл из Telegram',
		description: 'Описание',
	})
	@IsOptional()
	@IsString()
	description?: string
}
