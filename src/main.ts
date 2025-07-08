import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { AllExceptionsFilter } from './common/filters/http-exception.filter'
import { ResponseInterceptor } from './common/interceptors/response.interceptor'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const config = app.get(ConfigService)
	const port = config.get<number>('app.port', 5000)

	const allowedOrigins = [
		'http://localhost:5173',
		'http://localhost:5000',
		'http://workriseup.website',
		'http://api.workriseup.website',
		'https://api.workriseup.website',
	]

	app.enableCors({
		origin: (origin: string | undefined, callback) => {
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true)
			} else {
				console.warn(`Blocked CORS request from: ${origin}`)
				callback(new Error(`CORS error: ${origin} not allowed`))
			}
		},
		credentials: true,
	})

	app.useGlobalFilters(new AllExceptionsFilter())
	app.useGlobalInterceptors(new ResponseInterceptor())

	const swaggerConfig = new DocumentBuilder()
		.setTitle('Rise SRM Admin API')
		.setDescription(
			'API-документация CRM-системы для управления пользователями, кандидатами и аналитикой.'
		)
		.setVersion('1.0.0')
		.addBearerAuth(
			{ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
			'bearerAuth'
		)
		.build()

	const document = SwaggerModule.createDocument(app, swaggerConfig)
	SwaggerModule.setup('api/docs', app, document)

	await app.listen(port)

	console.log(`🚀 Server running on http://localhost:${port}`)
	console.log(`📘 Swagger:       http://localhost:${port}/api/docs`)
	console.log(`🌐 Frontend URL:  http://localhost:5173`)
}
bootstrap()
