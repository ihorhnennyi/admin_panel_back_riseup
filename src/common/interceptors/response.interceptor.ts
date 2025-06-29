import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

/**
 * Интерцептор, автоматически оборачивающий все успешные ответы в формат:
 * {
 *   success: true,
 *   data: ...
 * }
 */
@Injectable()
export class ResponseInterceptor<T>
	implements NestInterceptor<T, { success: true; data: T }>
{
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			map(data => ({
				success: true,
				data,
			}))
		)
	}
}
