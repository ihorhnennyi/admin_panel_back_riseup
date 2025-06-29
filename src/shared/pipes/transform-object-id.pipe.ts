import {
	ArgumentMetadata,
	BadRequestException,
	Injectable,
	PipeTransform,
} from '@nestjs/common'
import { Types } from 'mongoose'

@Injectable()
export class TransformObjectIdPipe
	implements PipeTransform<string, Types.ObjectId>
{
	transform(value: string, metadata: ArgumentMetadata): Types.ObjectId {
		if (!Types.ObjectId.isValid(value)) {
			throw new BadRequestException(`Неверный ObjectId: ${value}`)
		}

		return new Types.ObjectId(value)
	}
}
