import { PartialType } from '@nestjs/swagger'
import { CreateStatusDto } from './create-status.dto'

/**
 * DTO для обновления статуса.
 * Все поля необязательные, наследуются от CreateStatusDto.
 */
export class UpdateStatusDto extends PartialType(CreateStatusDto) {}
