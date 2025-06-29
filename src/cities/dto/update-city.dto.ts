import { PartialType } from '@nestjs/swagger'
import { CreateCityDto } from './create-city.dto'

/**
 * DTO для обновления города. Все поля необязательны, наследуются от CreateCityDto.
 */
export class UpdateCityDto extends PartialType(CreateCityDto) {}
