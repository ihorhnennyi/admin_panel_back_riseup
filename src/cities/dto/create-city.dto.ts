import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateCityDto {
	@ApiProperty({ example: 'Kyiv', description: 'Название города' })
	@IsString()
	@IsNotEmpty()
	name: string

	@ApiPropertyOptional({ example: 50.4501, description: 'Широта (latitude)' })
	@IsOptional()
	@IsNumber()
	latitude?: number

	@ApiPropertyOptional({ example: 30.5234, description: 'Долгота (longitude)' })
	@IsOptional()
	@IsNumber()
	longitude?: number

	@ApiPropertyOptional({
		example: '#ff5733',
		description: 'Цвет для отображения (hex)',
	})
	@IsOptional()
	@IsString()
	color?: string
}
