import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
	IsArray,
	IsBoolean,
	IsDateString,
	IsEmail,
	IsEnum,
	IsMongoId,
	IsNotEmpty,
	IsOptional,
	IsString,
	MinLength,
} from 'class-validator'
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

	@ApiPropertyOptional()
	@IsString()
	@IsOptional()
	lastName?: string

	@ApiPropertyOptional()
	@IsString()
	@IsOptional()
	middleName?: string

	@ApiPropertyOptional()
	@IsString()
	@IsOptional()
	phone?: string

	@ApiPropertyOptional()
	@IsMongoId()
	@IsOptional()
	city?: string

	@ApiPropertyOptional()
	@IsMongoId()
	@IsOptional()
	branch?: string

	@ApiPropertyOptional()
	@IsString()
	@IsOptional()
	description?: string

	@ApiPropertyOptional()
	@IsString()
	@IsOptional()
	position?: string

	@ApiPropertyOptional()
	@IsDateString()
	@IsOptional()
	birthDate?: string

	@ApiPropertyOptional()
	@IsBoolean()
	@IsOptional()
	isActive?: boolean

	@ApiPropertyOptional()
	@IsString()
	@IsOptional()
	viber?: string

	@ApiPropertyOptional()
	@IsString()
	@IsOptional()
	whatsapp?: string

	@ApiPropertyOptional()
	@IsString()
	@IsOptional()
	facebook?: string

	@ApiPropertyOptional()
	@IsString()
	@IsOptional()
	telegram?: string

	@ApiPropertyOptional()
	@IsArray()
	@IsOptional()
	languages?: string[]

	@ApiPropertyOptional()
	@IsArray()
	@IsOptional()
	skills?: string[]

	@ApiPropertyOptional()
	@IsString()
	@IsOptional()
	workSchedule?: string

	@ApiPropertyOptional()
	@IsString()
	@IsOptional()
	employmentType?: string

	@ApiPropertyOptional()
	@IsDateString()
	@IsOptional()
	startDate?: string

	@ApiPropertyOptional()
	@IsOptional()
	experienceYears?: number

	@ApiPropertyOptional()
	@IsArray()
	@IsOptional()
	specializations?: string[]

	@ApiPropertyOptional()
	@IsString()
	@IsOptional()
	linkedinUrl?: string

	@ApiPropertyOptional()
	@IsString()
	@IsOptional()
	identificationNumber?: string

	@ApiPropertyOptional()
	@IsArray()
	@IsOptional()
	certificates?: string[]

	@ApiPropertyOptional()
	@IsString()
	@IsOptional()
	supervisor?: string

	@ApiPropertyOptional()
	@IsArray()
	@IsOptional()
	responsibilities?: string[]

	@ApiPropertyOptional()
	@IsString()
	@IsOptional()
	emergencyContact?: string

	@ApiPropertyOptional()
	@IsString()
	@IsOptional()
	photoUrl?: string
}
