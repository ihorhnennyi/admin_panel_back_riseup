import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
} from '@nestjs/common'
import { Request, Response } from 'express'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost): void {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()
		const request = ctx.getRequest<Request>()

		const status =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR

		let message: string | string[] = 'Internal server error'

		if (exception instanceof HttpException) {
			const exceptionResponse = exception.getResponse()
			if (
				typeof exceptionResponse === 'object' &&
				exceptionResponse !== null &&
				'message' in exceptionResponse
			) {
				message = (exceptionResponse as any).message
			} else {
				message = exception.message
			}
		} else if (exception instanceof Error) {
			message = exception.message
		}

		response.status(status).json({
			success: false,
			statusCode: status,
			path: request.url,
			timestamp: new Date().toISOString(),
			message,
		})
	}
}
