import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { isValidObjectId } from 'mongoose'

/**
 * Проверяет, что значение является валидным MongoDB ObjectId.
 * Возвращает строку без преобразования в Types.ObjectId.
 */
@Injectable()
export class ParseObjectIdPipe implements PipeTransform<string, string> {
	transform(value: string): string {
		if (!isValidObjectId(value)) {
			throw new BadRequestException(`Неверный Mongo ObjectId: ${value}`)
		}
		return value
	}
}
