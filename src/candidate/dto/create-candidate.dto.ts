import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
	IsBoolean,
	IsEmail,
	IsMongoId,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsPhoneNumber,
	IsString,
} from 'class-validator'

export class CreateCandidateDto {
	@ApiProperty({ example: 'Іван' })
	@IsNotEmpty()
	@IsString()
	firstName: string

	@ApiPropertyOptional({ example: 'Петренко' })
	@IsOptional()
	@IsString()
	lastName?: string

	@ApiPropertyOptional({ example: 'Олександрович' })
	@IsOptional()
	@IsString()
	middleName?: string

	@ApiPropertyOptional({ example: 'ivan@example.com' })
	@IsOptional()
	@IsEmail()
	email?: string

	@ApiPropertyOptional({ example: '+380501234567' })
	@IsOptional()
	@IsPhoneNumber()
	phone?: string

	@ApiPropertyOptional({ example: 25 })
	@IsOptional()
	@IsNumber()
	age?: number

	@ApiPropertyOptional({ example: 'Frontend Developer' })
	@IsOptional()
	@IsString()
	position?: string

	@ApiPropertyOptional({ example: 2000 })
	@IsOptional()
	@IsNumber()
	salary?: number

	@ApiProperty({
		example: '662f1f77bcf86cd799439011',
		description: 'ID города',
	})
	@IsMongoId()
	city: string

	@ApiProperty({
		example: '662f1f77bcf86cd799439012',
		description: 'ID источника',
	})
	@IsMongoId()
	source: string

	@ApiProperty({
		example: '662f1f77bcf86cd799439013',
		description: 'ID статуса',
	})
	@IsMongoId()
	status: string

	@ApiPropertyOptional({
		example: 'Досвідчений розробник з 3 роками досвіду',
	})
	@IsOptional()
	@IsString()
	description?: string

	@ApiPropertyOptional({ example: 'Повна зайнятість' })
	@IsOptional()
	@IsString()
	employmentType?: string

	@ApiPropertyOptional({ example: 'Чоловік' })
	@IsOptional()
	@IsString()
	gender?: string

	@ApiPropertyOptional({ example: true })
	@IsOptional()
	@IsBoolean()
	isActive?: boolean
}
